# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import Suspension, User


# GetSuspension Controller
class GetSuspensionController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/get_suspension", view_func=self.get_suspension, methods=["GET"])

	@jwt_required()
	def get_suspension(self) -> dict[str, dict[str,str]|bool]:
		email = request.args["email"]
		user = User.queryUserAccount(email)
		if not user:
			return {"success": False}

		suspension = Suspension.getOngoingSuspension(user)
		if not suspension:
			return {"success": False}
		
		return {
			"success": True, 
			"data": {
				"end": suspension.end,
				"reason": suspension.description
			}
		}