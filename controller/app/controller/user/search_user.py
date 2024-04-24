# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import User, Suspension, UserProfile
from app.controller.authentication import permissions_required, bcrypt

class SearchUserController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/search_user_account", view_func=self.searchAllAccount, methods=["GET"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def searchAllAccount(self) -> dict[str, list[dict[str, str | bool | None]]]:
		list_of_accs = []
		for user in User.queryAllAccount():
			profile = UserProfile.queryUP(user.profile)
			if profile and profile.has_admin_permission:
				continue
			suspension = Suspension.getOngoingSuspension(user)
			if not suspension:
				list_of_accs.append({
					"email": user.email, 
					"phone": user.phone, 
					"first_name": user.first_name, 
					"last_name": user.last_name, 
					"profile": user.profile,
					"suspended": False
				})
			else:
				list_of_accs.append({
					"email": user.email, 
					"phone": user.phone, 
					"first_name": user.first_name, 
					"last_name": user.last_name, 
					"profile": user.profile,
					"suspended": True,
					"suspension_end": None if not suspension.end else suspension.end.strftime("%m/%d/%Y")
				})
		
		return {"accounts": list_of_accs}