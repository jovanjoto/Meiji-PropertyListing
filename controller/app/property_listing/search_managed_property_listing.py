from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt
from entity import PropertyListing
from controller.app.authentication import permissions_required

class SearchManagedPropertyListingController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule('/search_managed_property_listings', view_func=self.searchAllManagedPropertyListing, methods=["GET"])

	@permissions_required("has_listing_permission")
	@jwt_required()
	def searchAllManagedPropertyListing(self) -> dict[str, list[dict[str, str | bool | None]]]:
		claims = get_jwt()
		agent_email = claims["email"]
		list_of_managed_pls = list()
		for pl in PropertyListing.queryAllManagedPL(agent_email=agent_email):
			list_of_managed_pls.append({
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
				"image_url" : pl.image_url,
				"listing_date" : pl.listing_date,
				"is_sold" : pl.is_sold,
				"seller_email" : pl.seller_email,
				"transaction_date" : pl.transaction_date.strftime("%Y-%m-%d") if pl.is_sold else None,
				"agent_email" : pl.agent_email,
				"seller_email" : pl.seller_email
			})
		
		return {"properties" : list_of_managed_pls}
  
