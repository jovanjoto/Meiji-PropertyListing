# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from datetime import datetime, date

# Local dependencies
from app.entity.propertylisting import PropertyListing
from app.controller.authentication import permissions_required

class UpdatePropertyListingController(Blueprint):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.add_url_rule("/update_property_listing", view_func=self.updatePL, methods=["PATCH"])
        
    @permissions_required("has_listing_permission")
    @jwt_required()
    def updatePL(self) -> dict[str,bool]:
        details = request.get_json()
        if not details.get("transaction_date"):
            details["transaction_date"] = date.today()
        else:
            details["transaction_date"] = datetime.strptime(details["transaction_date"], "%Y-%m-%d").date()

        successBool = PropertyListing.updatePL(details)
        return {"success": successBool}