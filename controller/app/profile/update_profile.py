# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from entity import UserProfile
from app.authentication import permissions_required


class UpdateProfileController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/update_user_profile", view_func=self.updateProfileCnt, methods=["PATCH"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def updateProfileCnt(self) -> dict[str, bool]:
		newDetails = request.get_json()
		results = UserProfile.updateProfile(newDetails)
		return {"success": results}