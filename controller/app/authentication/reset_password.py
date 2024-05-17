# Libraries
from flask_mail import Message
from flask import Blueprint, request, current_app
from secrets import token_urlsafe # type: ignore

from entity import User
from .utils import bcrypt, mail

# Login User Controller
class ResetPasswordController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/reset_password", view_func=self.resetPassword, methods=["POST"])

	def resetPassword(self):
		json = request.get_json()
		email = json.get("email")

		# Generates new password
		generated_password = self.generatePassword()
		# Hashed password
		hashed_password = self.hashPassword(generated_password)

		# Calls entity to Updates password
		is_updated = User.updatePassword(newPassword=hashed_password, email=email)
		
		if not is_updated:
			return {"success": False}
		
		# Send email
		self.sendEmail(email, generated_password)
		return {'success' : True}
	
	def generatePassword(self) -> str:
		return token_urlsafe(8)
	
	def hashPassword(self, password:str) -> bytes:
		return bcrypt.generate_password_hash(password)
	
	def sendEmail(self, email:str, password:str) -> None:
		body = f"""
		Dear sir/madam,
		You have requested our 'Forget Password' feature, and your password has been reset.
		Here is your new password:
		
		{password}

		Please store your new password safely, and do not share your new password to anyone!
		Thank you.
		Best regards,
		Meiji.
		"""
		msg = Message(subject="Reset Password for Meiji Property Listing", 
					recipients=[email], 
					body=body,
					sender=("MaizeGaze", current_app.config.get("MAIL_DEFAULT_SENDER")))
		mail.send(msg)

	

