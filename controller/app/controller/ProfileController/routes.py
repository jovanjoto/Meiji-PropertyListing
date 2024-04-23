# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from .controller import UserProfileController
from app.controller.AuthController import permissions_required

# Initialize blueprint
router = Blueprint('profile', __name__)

# Create
@router.route("/create_user_profile", methods=["PUT"])
@permissions_required("has_admin_permission")
@jwt_required()
def create_user_profile():
  json = request.get_json()
  controller = UserProfileController()
  results = controller.createProfile(json)
  return {"success": results}

# Read/View
@router.route("/view_user_profile", methods=["GET"])
@permissions_required("has_admin_permission")
@jwt_required()
def view_user_profile():
  profileName = request.args["profileName"]
  controller = UserProfileController()
  results = controller.viewUP(profileName)
  return {"success": results}

# Update
@router.route("/update_user_profile", methods=["PATCH"])
@permissions_required("has_admin_permission")
@jwt_required()
def update_user_profile():
  json = request.get_json()
  controller = UserProfileController()
  results = controller.updateProfileCnt(json)
  if not results:
    return {"success": False, "message": "User not found."}
  return {"success": True, "data": results}

# Search
@router.route("/search_user_profile", methods=["GET"])
@permissions_required("has_admin_permission")
@jwt_required()
def search_all_user_profiles():
  controller = UserProfileController()
  return controller.searchAllProfile()