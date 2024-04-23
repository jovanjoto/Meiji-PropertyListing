# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from .controller import SuspensionController
from app.controller.AuthController import permissions_required

# Initialize blueprint
router = Blueprint('suspension', __name__)

# Individual create
@router.route("/suspend_user_account", methods=["PUT"])
@permissions_required("has_admin_permission")
@jwt_required()
def suspend_account():
	json = request.get_json()
	controller = SuspensionController()
	result = controller.suspendAccCnt(email=json["email"], 
								   reason=json["reason"], 
								   duration=int(json["duration"]))
	return {"success": result}

# Bulk create
@router.route("/suspend_user_profile", methods=["PUT"])
@permissions_required("has_admin_permission")
@jwt_required()
def suspend_user_profile():
	json = request.get_json()
	controller = SuspensionController()
	result = controller.suspendProfileCnt(profile=json["profile"], 
									   reason=json["reason"], 
									   duration=int(json["duration"]))
	return {"success": result}

# Retrieve suspension information
@router.route("/get_suspension", methods=["GET"])
@jwt_required()
def get_suspension():
	json = request.get_json()
	controller = SuspensionController()
	return controller.querySuspension(email=json["email"])