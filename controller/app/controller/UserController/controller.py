# Libraries

# Local dependencies
from app.entity import User, UserProfile

class UserController():
	def __init__(self) -> None:
		pass

	def createAccount(self, details:dict[str,str]) -> bool:
		"""
		Creates a new user account by passing arguments:
			- details: dict[str,str], which contains pairs:
				- email:str,
				- phone:str, 
				- password:str, 
				- first_name:str, 
				- last_name:str, 
				- profile:str
		returns bool.
		"""
		# Profile does not exist
		profile = UserProfile.queryUP(details.get("profile"))
		if not profile:
			return False
		# Unauthorized request to make a user with admin permissions
		if profile.has_admin_permission:
			return False
		# Call entity method
		return User.createNewUserAccount(details=details)