from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt
from PIL import Image
import io # type: ignore
from base64 import encodebytes # type: ignore
from entity import PropertyListing, Shortlist
from app.authentication import permissions_required

class SearchSoldPropertyListingController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/search_sold_property_listings", view_func=self.searchAllSoldPropertyListing, methods=["GET"])

	@permissions_required("has_buying_permission")
	@jwt_required()
	def searchAllSoldPropertyListing(self) -> dict[str, list[dict[str, str | bool | None]]]:
		list_of_sold_pls = list()
		email = get_jwt()["email"]
		for pl in PropertyListing.queryAllSoldPL():
			# converts img_url to bytes
			img = Image.open(pl.image_url, mode="r")
			img = img.resize(size=(500,400))
			bytes_arr = io.BytesIO()
			img.save(bytes_arr, format="PNG")
			encoded_img = encodebytes(bytes_arr.getvalue()).decode('ascii')
			is_shortlisted = Shortlist.checkIfShortlisted(pl, email)

			list_of_sold_pls.append({
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
				"image_url" :'data:image/png;base64,' + encoded_img,
				"listing_date" : pl.listing_date,
				"is_sold" : pl.is_sold,
				"seller_email" : pl.seller_email,
				"transaction_date" : pl.transaction_date.strftime("%Y-%m-%d") if pl.is_sold else None,
				"agent_email" : pl.agent_email,
				"seller_email" : pl.seller_email,
				"is_shortlisted" : is_shortlisted
			})
		return {"properties" : list_of_sold_pls}
	