from flask import Blueprint, request
from flask.views import View
from flask_jwt_extended import jwt_required
from base64 import encodebytes # type: ignore
from PIL import Image
import io
from app.entity import PropertyListing, User, Views

class ViewBuyerPropertyListingController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/view_buyer_property_listing", view_func=self.viewPL, methods=["GET"])

	@jwt_required()
	def viewPL(self) -> dict[str, dict[str,str] | bool | str]:
		id = request.args["id"]
		pl = PropertyListing.queryPL(id)
		if not pl: 
			return {"success": False, "message": "Property Listing not found."}

		agent = User.queryUserAccount(pl.agent_email)
		if not agent:
			return {"success": False, "message": "Property Listing's agent not found."}

		# Increment views
		increment_success = Views.incrementViews(id)
		if not increment_success:
			return {"success": False, "message": "Technical error."}

		# converts img_url to bytes
		img = Image.open(pl.image_url, mode="r")
		bytes_arr = io.BytesIO()
		img.save(bytes_arr, format="PNG")
		encoded_img = encodebytes(bytes_arr.getvalue()).decode('ascii')

		results = {
			"id" : pl.id,
			"price" : pl.transaction_price if pl.is_sold else pl.price,
			"name" : pl.name, 
			"type" : pl.type,
			"address" : pl.address,
			"district" : pl.district,
			"description" : pl.description,
			"num_of_bedrooms" : pl.num_of_bedrooms,
			"num_of_bathrooms" : pl.num_of_bathrooms,
			"area" : pl.area,
			"image_url" : 'data:image/png;base64,' + encoded_img,
			"listing_date" : pl.listing_date.strftime("%Y-%m-%d"),
			"is_sold" : pl.is_sold,
			"seller_email" : pl.seller_email,
			"transaction_date" : pl.transaction_date.strftime("%Y-%m-%d") if pl.is_sold else None,
			"agent" : {
				"email": agent.email,
				"phone": agent.phone,
				"first_name": agent.first_name,
				"last_name": agent.last_name
			}
		}

		return {"success": True, "data": results}