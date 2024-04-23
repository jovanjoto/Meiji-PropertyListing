# Libraries
import datetime # type: ignore

# Local dependencies
from app.entity import Suspension, User

class SuspensionController():
	def __init__(self) -> None:
		pass
	
	def suspendAccCnt(self, email:str, reason:str, duration:int) -> bool:
		"""
		Suspends a user by passing arguments:
			- email:str, 
			- reason:str, 
			- duration:int (in days)
		returns bool.
		"""
		start_date = datetime.date.today()
		end_date = start_date + datetime.timedelta(days=duration)
		result = Suspension.createSuspension(email=email, reason=reason, start=start_date, end=end_date)
		return result

	def suspendProfileCnt(self, profile:str, reason:str, duration:int) -> bool:
		"""
		Suspends all users with a specified user profile by passing arguments:
			- profile:str, 
			- reason:str, 
			- duration:int (in days)
		returns bool.
		"""
		start_date = datetime.date.today()
		end_date = start_date + datetime.timedelta(days=duration)
		result = Suspension.createBulkSuspension(profile=profile, reason=reason, start=start_date, end=end_date)
		return result
	
	def querySuspension(self, email:str) -> dict[str, dict[str,str]|bool]:
		"""
		Retrieve a user's ongoing suspension by passing arguments:
			- email:str, 
		returns dict.
		"""
		user = User.queryUserAccount(email)
		if not user:
			return {"success": False}

		suspension = Suspension.getOngoingSuspension(user)
		if not suspension:
			return {"success": False}
		
		return {
			"success": True, 
			"data": {
				"end": suspension.end,
				"reason": suspension.description
			}
		}