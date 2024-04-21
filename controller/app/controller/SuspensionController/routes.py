# Libraries
from flask import Blueprint, request

# Local dependencies
from .controller import SuspensionController

# Initialize blueprint
router = Blueprint('suspension', __name__)

router.route("/suspend_user_account", methods=["PUT"])
def suspend_account():
	json = request.get_json()
	controller = SuspensionController()
	result = controller.suspendAccCnt(email=json["email"], 
								   reason=json["reason"], 
								   duration=int(json["duration"]))
	return {"success": result}

router.route("/suspend_user_profile", methods=["PUT"])
def suspend_user_profile():
	json = request.get_json()
	controller = SuspensionController()
	result = controller.suspendProfileCnt(profile=json["profile"], 
									   reason=json["reason"], 
									   duration=int(json["duration"]))
	return {"success": result}