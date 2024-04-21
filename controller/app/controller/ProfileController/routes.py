# Libraries
from flask import Blueprint, request

# Local dependencies
from .controller import UserProfileController

# Initialize blueprint
router = Blueprint('profile', __name__)

@router.route("/create_user_profile", methods=["PUT"])
def create_user_profile():
  json = request.get_json()
  controller = UserProfileController()
  results = controller.createProfile(json)
  return {"success": results}

@router.route("/view_user_profile", methods=["GET"])
def view_user_profile():
  profileName = request.args["profileName"]
  controller = UserProfileController()
  results = controller.viewUP(profileName)
  return {"success": results}

@router.route("/update_user_profile", methods=["PATCH"])
def update_user_profile():
  json = request.get_json()
  controller = UserProfileController()
  results = controller.updateProfileCnt(json)
  if not results:
    return {"success": False, "message": "User not found."}
  return {"success": True, "data": results}
  
@router.route("/search_user_profile", methods=["GET"])
def search_all_user_profiles():
  controller = UserProfileController()
  return controller.searchAllProfile()