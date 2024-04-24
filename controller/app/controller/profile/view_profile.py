# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import UserProfile
from app.controller.authentication import permissions_required


class ViewUserProfileController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/view_user_profile", view_func=self.viewUP, methods=["GET"])
		
	@permissions_required("has_admin_permission")
	@jwt_required()
	def viewUP(self) -> dict[str, dict[str, str | bool] | None]:
		profileName = request.args["profileName"]
		userProfileObject = UserProfile.queryUP(profileName)
		if not userProfileObject:
			return {"success": None}
          
		userProfileJson = {
			"name": userProfileObject.name,
			"description": userProfileObject.description,
			"has_listing_permission": userProfileObject.has_listing_permission,
			"has_buying_permission": userProfileObject.has_buying_permission,
			"has_selling_permission": userProfileObject.has_selling_permission
		}
		return {"success": userProfileJson}