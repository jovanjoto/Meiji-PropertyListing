# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
# Local dependencies
from .controller import UserController
from app.controller.AuthController import permissions_required

# Initialize blueprint
router = Blueprint('user', __name__)

# Create
@router.route("/create_user_account", methods=["PUT"])
@permissions_required("has_admin_permission")
@jwt_required()
def create_user_account():
	json = request.get_json()
	controller = UserController()
	results = controller.createAccount(details=json)
	return {"success": results}

# Update
@router.route("/update_user_account", methods=["PATCH"])
@permissions_required("has_admin_permission")
@jwt_required()
def update_user_account():
	json = request.get_json()
	controller = UserController()
	results = controller.updateAccDetails(new_details=json)
	return {"success": results}

# Search
@router.route("/search_user_account", methods=["GET"])
@permissions_required("has_admin_permission")
@jwt_required()
def search_user_account():
	controller = UserController()
	return controller.searchAllAccount()

# Read/View
@router.route("/view_user_account", methods=["GET"])
@jwt_required()
def view_user_account():
	email:str = request.args["email"]
	controller = UserController()
	results = controller.viewUserAccount(email=email)
	if not results:
		return {"success": False, "message": "User not found."}
	return {"success": True, "data": results}