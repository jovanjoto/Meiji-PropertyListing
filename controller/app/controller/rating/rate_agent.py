# Libraries
from flask import Blueprint, request
from flask.views import View
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import Rating, User
from app.controller.authentication import permissions_required

class RateAgentController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/rate_agent", view_func=self.rateAgent, methods=["PUT"])
		
	@permissions_required("has_buying_permission", "has_selling_permission")
	@jwt_required()
	def rateAgent(self) -> dict[str, bool]:
		rateInfo = request.get_json()
		agent_email = rateInfo.agent_email
		rater_email = rateInfo.rater_email
		rating = rateInfo.rating
		successBool = Rating.createRating(agent_email=agent_email, rater_email=rater_email, rating=rating)
		return {"success": successBool}