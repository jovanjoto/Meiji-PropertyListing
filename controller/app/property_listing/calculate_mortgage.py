from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from entity import PropertyListing 
from app.authentication.utils import permissions_required

class CalculateMortgageController(Blueprint):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.add_url_rule("/calculate_mortgage", view_func=self.calculate_mortgage, methods=["POST"])

	@permissions_required("has_buying_permission")
	@jwt_required()
	def calculate_mortgage(self) -> dict[str, str | bool | dict[str, float]]:
		json = request.get_json()
		pl = PropertyListing.queryPL(json["propId"])
		dp_percentage = float(json["details"]["dp_percentage"])
		interest_rate = float(json["details"]["interest_rate"])
		loan_tenure = int(json["details"]["loan_tenure"])

		if not pl: 
			return {"success": False, "message": "Property Listing not found."}

		principal_price = (1 - dp_percentage/100) * (pl.transaction_price if pl.is_sold else pl.price)
		i = interest_rate/100/12
		months = loan_tenure * 12
		interest = i * ((1 + i) ** months) / ((1 + i) ** months - 1)		
		monthly_payment = principal_price * interest
		final_price = monthly_payment * months
		return {"success": True, "data": {
			"monthly_payment": monthly_payment,
			"total_mortgage": final_price,
			"mortgage_size": principal_price,
			"mortgage_interest": final_price - principal_price
		}}