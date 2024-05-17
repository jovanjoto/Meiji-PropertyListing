# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
import datetime # type: ignore

# Local dependencies
from entity import Suspension, User
from controller.app.authentication import permissions_required

# SuspendUserProfile Controller
class SuspendProfileController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/suspend_user_profile", view_func=self.suspendProfileCnt, methods=["PUT"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def suspendProfileCnt(self) -> dict[str, bool]:
		json = request.get_json()
		profile=json["profile"]
		reason=json["reason"]
		duration=int(json["duration"])
		start_date = datetime.date.today()
		end_date = start_date + datetime.timedelta(days=duration)
		# Get all users within the profile
		users = User.queryAllUserByProfile(profile=profile)
		for u in users:
			success = Suspension.createSuspension(email=u.email, reason=reason, start=start_date, end=end_date)
			if not success:
				return {"success": False} 
		return {"success": True}
	
	