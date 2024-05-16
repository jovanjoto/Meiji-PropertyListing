# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import User, UserProfile
from app.controller.authentication import permissions_required, bcrypt


class UpdateAccountController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/update_user_account", view_func=self.updateAccDetails, methods=["PATCH"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def updateAccDetails(self) -> dict[str, bool]:
		new_details = request.get_json()
		if new_details.get("password"):
			new_details["password"] = self.hashPassword(new_details["password"])
		# Trying to update an admin's information
		user = User.queryUserAccount(new_details["email"])
		if not user:
			return {"success" : False}
		profile = UserProfile.queryUP(user.profile)
		if profile and profile.has_admin_permission:
			return {"success" : False}
		# Trying to give user admin previleges
		if new_details.get("profile"):
			new_profile = UserProfile.queryUP(new_details["profile"])
			if new_profile and new_profile.has_admin_permission:
				return {"success" : False}
			
		return {"success" : User.updateAccount(details=new_details)}
	
	def hashPassword(self, password:str) -> bytes:
		return bcrypt.generate_password_hash(password)