# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from datetime import datetime, date

# Local dependencies
from entity import PropertyListing
from app.authentication import permissions_required

class MarkropertyListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.add_url_rule("/mark_sold_property_listing", view_func=self.markPLAsSold, methods=["PATCH"])
        
    @permissions_required("has_listing_permission")
    @jwt_required()
    def markPLAsSold(self) -> dict[str,bool]:
        details = request.get_json()
        if not details.get("transaction_date"):
            details["transaction_date"] = date.today()
        else:
            details["transaction_date"] = datetime.strptime(details["transaction_date"], "%Y-%m-%d").date()
        successBool = PropertyListing.markPLAsSold(details)
        return {"success": successBool}