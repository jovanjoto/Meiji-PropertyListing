# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
import datetime # type: ignore

# Local dependencies
from app.entity import Suspension 
from app.controller.authentication import permissions_required

# SuspendUser Controller
class SuspendAccController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/suspend_user_account", view_func=self.suspendAccCnt, methods=["PUT"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def suspendAccCnt(self) -> dict[str, bool]:
		json = request.get_json()
		email:str=json["email"]
		reason:str=json["reason"]
		duration=int(json["duration"])
		start_date = datetime.date.today()
		end_date = start_date + datetime.timedelta(days=duration)
		result = Suspension.createSuspension(email=email, reason=reason, start=start_date, end=end_date)
		return {"success": result}