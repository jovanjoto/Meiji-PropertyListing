from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import User

class ViewUserController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/view_user_account", view_func=self.view_user_account, methods=["GET"])

	@jwt_required()
	def view_user_account(self) -> dict[str, dict[str,str] | bool | str]:
		email:str = request.args["email"]
		user = User.queryUserAccount(email=email)
		if not user:
			return {"success": False, "message": "User not found."}
		results = {
			"email": user.email, 
			"phone": user.phone, 
			"first_name": user.first_name, 
			"last_name": user.last_name, 
			"profile": user.profile
		}
		return {"success": True, "data": results}