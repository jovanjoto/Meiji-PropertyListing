# Libraries

# Local dependencies
from app.entity import User, Suspension, UserProfile
from app.controller.AuthController import AuthController

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
		auth = AuthController()
		details["password"] = auth.hash_password(details["password"]) # type: ignore
		# Call entity method
		return User.createNewUserAccount(details=details)

	def updateAccDetails(self, new_details:dict[str,str]) -> bool:
		"""
		Update a user account's information by passing the new information as arguments:
			- new_details: dict[str,str], which contains pairs:
				- email:str,
				- phone:str, 
				- password:str, 
				- first_name:str, 
				- last_name:str, 
				- profile:str
		returns bool.
		"""
		auth = AuthController()
		new_details["password"] = auth.hash_password(new_details["password"]) # type: ignore
		# Call entity method
		return User.updateAccount(details=new_details)

	def viewUserAccount(self, email:str) -> dict[str,str] | None:
		"""
		Queries a user's information by passing arguments:
			- details: dict[str,str], which contains pairs:
				- email:str,
		returns dict.
		"""
		# Call entity method
		user = User.queryUserAccount(email=email)
		if not user:
			return None
		return {
			"email": user.email, 
			"phone": user.phone, 
			"first_name": user.first_name, 
			"last_name": user.last_name, 
			"profile": user.profile
		}
	
	def searchAllAccount(self) -> dict[str, list[dict[str, str | bool | None]]]:
		"""
		Queries a all non-admin users.
		returns dict.
		"""
		list_of_accs:list[dict[str, str | bool | None]] = []
		for user in User.queryAllAccount():
			profile = UserProfile.queryUP(user.profile)
			if profile and profile.has_admin_permission:
				continue
			suspension = Suspension.getOngoingSuspension(user)
			if not suspension:
				list_of_accs.append({
					"email": user.email, 
					"phone": user.phone, 
					"first_name": user.first_name, 
					"last_name": user.last_name, 
					"profile": user.profile,
					"suspended": False
				})
			else:
				list_of_accs.append({
					"email": user.email, 
					"phone": user.phone, 
					"first_name": user.first_name, 
					"last_name": user.last_name, 
					"profile": user.profile,
					"suspended": True,
					"suspension_end": None if not suspension.end else suspension.end.strftime("%m/%d/%Y")
				})
		
		return {"accounts": list_of_accs}