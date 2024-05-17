from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt
from PIL import Image
import io
from base64 import encodebytes # type: ignore
# Local dependencies
from entity import User, Review, Rating, PropertyListing, Shortlist
from app.authentication import permissions_required

class ViewREAController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.add_url_rule("/view_rea", view_func=self.viewREA, methods=["GET"])

    @permissions_required("has_buying_permission", "has_selling_permission")
    @jwt_required()
    def viewREA(self) -> dict[str, bool | dict[str, str | None | bool]]:
        email:str = request.args["email"]
        buyerEmail = get_jwt()["email"]
        user = User.queryUserAccount(email=email)
        if not user:
            return {"success": False}
        
        ratings_list = []
        reviews_list = []
        listings_list = []

        for rating in Rating.queryAllREARating(email):
            ratings_list.append({
                "rating": rating.rating,
                "raterEmail": rating.raterEmail 
            })
        
        for review in Review.queryAllReview(email):
            reviews_list.append({
                "review": review.review,
                "reviewerEmail": review.reviewerEmail
            })
        
        for pl in PropertyListing.queryAllManagedPL(email):
            img = Image.open(pl.image_url, mode="r")
            img = img.resize(size=(500,400))
            bytes_arr = io.BytesIO()
            img.save(bytes_arr, format="PNG")
            encoded_img = encodebytes(bytes_arr.getvalue()).decode('ascii')
            is_shortlisted = Shortlist.checkIfShortlisted(pl, buyerEmail)

            listings_list.append({
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
				"is_sold" : pl.is_sold,
				"image_url" : 'data:image/png;base64,' + encoded_img,
				"listing_date" : pl.listing_date,
				"seller_email" : pl.seller_email,
				"transaction_date" : pl.transaction_date.strftime("%Y-%m-%d") if pl.is_sold else None,
				"agent_email" : pl.agent_email,
				"seller_email" : pl.seller_email,
				"is_shortlisted" : is_shortlisted
			})

        results = {
            "email": user.email,
            "phone": user.phone, 
            "first_name": user.first_name, 
            "last_name": user.last_name, 
            "profile": user.profile,
            "ratings": ratings_list,
            "reviews": reviews_list,
            "properties": listings_list
        }

        return {"success": True, "results": results}
    