# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt

# Local dependencies
from app.entity import Shortlist
from app.controller.authentication import permissions_required

class RemoveShortlistController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/remove_shortlist_property", view_func=self.removeShortlist, methods=["DELETE"])
		
	@permissions_required("has_buying_permission")
	@jwt_required()
	def removeShortlist(self) -> dict[str,bool]:
		buyer_email = get_jwt()["email"]
		json = request.get_json()
		property_id = json.get("property_id")
		successBool = Shortlist.removeShortlist(propertyId=property_id, buyerEmail=buyer_email)
		return {"success": successBool}