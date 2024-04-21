# Libraries
from flask import Blueprint, request

# Local dependencies
from .controller import UserController

# Initialize blueprint
router = Blueprint('user', __name__)

@router.route("/create_user_account", methods=["PUT"])
def create_user_account():
	json = request.get_json()
	controller = UserController()
	results = controller.createAccount(details=json)
	return {"success": results}

@router.route("/update_user_account", methods=["PATCH"])
def update_user_account():
	json = request.get_json()
	controller = UserController()
	results = controller.updateAccDetails(new_details=json)
	return {"success": results}

@router.route("/view_user_account", methods=["GET"])
def view_user_account():
	email:str = request.args["email"]
	controller = UserController()
	results = controller.viewUserAccount(email=email)
	if not results:
		return {"success": False, "message": "User not found."}
	return {"success": True, "data": results}

@router.route("/search_user_account", methods=["GET"])
def search_user_account():
	controller = UserController()
	return controller.searchAllAccount()
