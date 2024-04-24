# Libraries
from flask_jwt_extended import verify_jwt_in_request, get_jwt, jwt_required, create_access_token
from flask import Blueprint, request

from app.entity import User, UserProfile, Suspension
from .utils import bcrypt

# Login User Controller
class LoginUserController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/login", view_func=self.login, methods=["POST"])
		self.add_url_rule("/verify_token", view_func=self.verify_token, methods=["GET"])
	
	def login(self):
		json = request.get_json()
		email = json.get("email")
		password = json.get("password")

		# Queries user
		user = User.queryUserAccount(email=email)

		# Check validity
		if not user or not bcrypt.check_password_hash(pw_hash=user.password, password=password):
			return {'access_token' : None}
		
		# Queries profile
		profile = UserProfile.queryUP(user.profile)
		if not profile:
			return {'access_token' : None}
		
		# Generate token
		access_token = create_access_token(
        identity=email, 
        additional_claims={
            'email': user.email,
            'has_admin_permission': profile.has_admin_permission,
			'has_buying_permission': profile.has_buying_permission,
			'has_listing_permission': profile.has_listing_permission,
			'has_selling_permission': profile.has_selling_permission,
            }
        )

		return {'access_token' : access_token}
	
	@jwt_required()
	def verify_token(self):
		verify_jwt_in_request()
		claims = get_jwt()
		suspended = self.check_if_user_suspended(claims["email"])
		return {'success' : True, 'suspended': suspended}
	
	def check_if_user_suspended(self, email:str) -> bool:
		user = User.queryUserAccount(email)
		if not user:
			return False
		suspension = Suspension.getOngoingSuspension(user)
		if not suspension:
			return False
		return True

