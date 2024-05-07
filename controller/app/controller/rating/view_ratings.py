# Libraries
from flask import Blueprint
from flask_jwt_extended import get_jwt, jwt_required

# Local dependencies
from app.entity import Rating, User
from app.controller.authentication import permissions_required

class ViewRatingController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/view_ratings", view_func=self.viewAllREARating, methods=["GET"])
		
	@permissions_required("has_listing_permission")
	@jwt_required()
	def viewAllREARating(self) -> dict[str,list[dict[str,float]]]:
		email = get_jwt()["email"]
		ratingData = []
		for rating in Rating.queryAllREARating(email):
			raterEmail = rating.raterEmail
			user = User.queryUserAccount(raterEmail)
			if user:
				ratingData.append({
					"rating": rating.rating,
					"userFirstName": user.first_name,
					"userLastName": user.last_name,
					"userEmail": user.email,
					"userPhone": user.phone
				})
		return {"ratings": ratingData}