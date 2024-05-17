# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from entity import UserProfile
from controller.app.authentication import permissions_required

class CreateUserProfileController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/create_user_profile", view_func=self.createProfile, methods=["PUT"])
		
	@permissions_required("has_admin_permission")
	@jwt_required()
	def createProfile(self) -> dict[str,bool]:
		details = request.get_json()
		successBool = UserProfile.createNewUserProfile(details)
		return {"success": successBool}