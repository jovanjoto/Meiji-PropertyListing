# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import UserProfile
from app.controller.authentication import permissions_required


class SearchUserProfileController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/search_user_profile", view_func=self.search_all_user_profiles, methods=["GET"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def search_all_user_profiles(self) -> dict[str, list[dict[str, str | bool]]]:
		profileListJson = []
		for profile in UserProfile.queryAllProfile():
			if profile.has_admin_permission:
				continue
			userProfileJson = {
				"name": profile.name,
				"description": profile.description,
				"has_listing_permission": profile.has_listing_permission,
				"has_buying_permission": profile.has_buying_permission,
				"has_selling_permission": profile.has_selling_permission
			}
			profileListJson.append(userProfileJson)
		return {"profiles": profileListJson}