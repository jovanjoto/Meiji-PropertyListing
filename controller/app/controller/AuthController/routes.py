# Libraries
from flask_jwt_extended import JWTManager, verify_jwt_in_request, get_jwt, jwt_required, create_access_token
from flask import Blueprint, request
from app.entity import User
from functools import wraps # type: ignore

from .controller import AuthController # type: ignore

# Initialize
jwt = JWTManager()
router = Blueprint("authentication", __name__)

# Wrapper for permission-protected routes
def permissions_required(*required_permissions:str):
	'''Function wrapper for protected routes'''
	def wrapper(fn):
		@wraps(fn)
		def decorator(*args, **kwargs):
			# Verifying JWT
			verify_jwt_in_request()
			claims = get_jwt()
			controller = AuthController()
			# Check if suspended
			if controller.check_if_user_suspended(claims["email"]):
				return {'status_code': 401, 'message' : 'User suspended'}
			# Check if has permission
			for perm in set(required_permissions):
				if not claims.get(perm):
					return {'status_code': 401, 'message' : 'Insufficient permission'}
			return fn(*args, **kwargs)
		return decorator
	return wrapper

# JWT lookup loader
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    '''Automatic User loading in protected routes'''
    identity = jwt_data["sub"]
    return User.queryUserAccount(email=identity)

@router.route('/login', methods=['POST'])
def login():
	controller = AuthController()
	json = request.get_json()
	email = json.get("email")
	password = json.get("password")
	access_token = controller.login(email, password)
	return {'access_token' : access_token}

''' PROTECTED ROUTES'''
@router.route("/verify_token", methods=["GET"])
@jwt_required()
def verify_token():
    verify_jwt_in_request()
    return {'success' : True}