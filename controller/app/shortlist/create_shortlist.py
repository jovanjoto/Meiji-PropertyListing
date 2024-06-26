# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt

# Local dependencies
from entity import Shortlist
from controller.app.authentication import permissions_required

class ShortlistPropertyController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/shortlist_property", view_func=self.shortlistProperty, methods=["POST"])
		
	@permissions_required("has_buying_permission")
	@jwt_required()
	def shortlistProperty(self) -> dict[str,bool]:
		buyer_email = get_jwt()["email"]
		json = request.get_json()
		propertyId = json.get("propertyId")
		successBool = Shortlist.createPropertyShortlist(propertyId=propertyId, buyerEmail=buyer_email)
		return {"success": successBool}