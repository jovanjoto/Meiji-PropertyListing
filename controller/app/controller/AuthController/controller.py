# Libraries
from app.entity import User, UserProfile, Suspension
from flask_jwt_extended import JWTManager, get_jwt, create_access_token
from flask_bcrypt import Bcrypt

# Initialize Bcrypt
bcrypt = Bcrypt()

class AuthController():
	def __init__(self) -> None:
		pass
	
	def login(self, email:str, password:str) -> str | None:
		# Queries user
		user = User.queryUserAccount(email=email)

		# Check validity
		if not user or not bcrypt.check_password_hash(pw_hash=user.password, password=password):
			return None
		
		# Queries profile
		profile = UserProfile.queryUP(user.profile)
		if not profile:
			return None
		
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
		return access_token

	def check_if_user_suspended(self, email:str) -> bool:
		user = User.queryUserAccount(email)
		if not user:
			return False
		suspension = Suspension.getOngoingSuspension(user)
		if not suspension:
			return False
		return True
	
	def hash_password(self, password:str) -> str:
		return str(bcrypt.generate_password_hash(password))