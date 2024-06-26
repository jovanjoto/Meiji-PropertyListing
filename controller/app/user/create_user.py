# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from entity import User, UserProfile
from controller.app.authentication import permissions_required, bcrypt

class CreateAccountController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/create_user_account", view_func=self.createAccount, methods=["PUT"])
		self.add_url_rule("/get_list_of_user_profiles", view_func=self.getListOfUserProfiles, methods=["GET"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def createAccount(self) -> dict[str, bool]:
		details = request.get_json()
		details["password"] = self.hashPassword(details["password"]) # type: ignore
		profile = UserProfile.queryUP(details["profile"])
		if not profile or profile.has_admin_permission:
			return {"success" : False}
		# Call entity method
		return {"success" : User.createNewUserAccount(details=details)}
	
	@permissions_required("has_admin_permission")
	@jwt_required()
	def getListOfUserProfiles(self) -> dict[str, list[str]]:
		profileListJson = []
		for profile in UserProfile.queryAllProfile():
			if profile.has_admin_permission:
				continue
			profileListJson.append(profile.name)
		return {"profiles": profileListJson}
	
	def hashPassword(self, password:str) -> bytes:
		return bcrypt.generate_password_hash(password)