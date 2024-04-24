# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import UserProfile
from app.controller.authentication import permissions_required


class UpdateUserProfileController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/update_user_profile", view_func=self.update_user_profile, methods=["PATCH"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def update_user_profile(self) -> dict[str, bool]:
		newDetails = request.get_json()
		results = UserProfile.updateProfile(newDetails)
		return {"success": results}