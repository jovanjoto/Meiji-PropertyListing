# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import User
from app.controller.authentication import permissions_required, bcrypt


class UpdateUserController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/update_user_account", view_func=self.updateAccDetails, methods=["PATCH"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def updateAccDetails(self) -> dict[str, bool]:
		new_details = request.get_json()
		if new_details.get("password"):
			new_details["password"] = self.hashPassword(new_details["password"])
		# Call entity method
		return {"success" : User.updateAccount(details=new_details)}
	
	def hashPassword(self, password:str) -> bytes:
		return bcrypt.generate_password_hash(password)