# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import User
from app.controller.authentication import permissions_required, bcrypt

class CreateAccountController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/create_user_account", view_func=self.createAccount, methods=["PUT"])

	@permissions_required("has_admin_permission")
	@jwt_required()
	def createAccount(self) -> dict[str, bool]:
		details = request.get_json()
		details["password"] = self.hashPassword(details["password"]) # type: ignore
		# Call entity method
		return {"success" : User.createNewUserAccount(details=details)}
	
	def hashPassword(self, password:str) -> bytes:
		return bcrypt.generate_password_hash(password)