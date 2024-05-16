# Libraries
from app.entity import User, Suspension
from flask_jwt_extended import verify_jwt_in_request, get_jwt, JWTManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from functools import wraps  # type: ignore

# Initialize
jwt = JWTManager()
# Initialize Bcrypt
bcrypt = Bcrypt()
# Initialize Mail
mail = Mail()

# JWT lookup loader
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    '''Automatic User loading in protected routes'''
    identity = jwt_data["sub"]
    return User.queryUserAccount(email=identity)

# Wrapper for permission-protected routes
def permissions_required(*required_permissions:str):
	def check_if_user_suspended(email:str) -> bool:
		user = User.queryUserAccount(email)
		if not user:
			return False
		suspension = Suspension.getOngoingSuspension(user)
		if not suspension:
			return False
		return True
		
	'''Function wrapper for protected routes'''
	def wrapper(fn):
		@wraps(fn)
		def decorator(*args, **kwargs):
			# Verifying JWT
			verify_jwt_in_request()
			claims = get_jwt()
			# Check if suspended
			if check_if_user_suspended(claims["email"]):
				return {'status_code': 401, 'message' : 'User suspended'}
			# Check if has permission
			for perm in set(required_permissions):
				if claims.get(perm):
					return fn(*args, **kwargs)
			return {'status_code': 401, 'message' : 'Insufficient permission'}
		return decorator
	return wrapper