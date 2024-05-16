# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore
from datetime import date

# Local dependencies
from .sqlalchemy import db

# Views Schema
class Views(db.Model):
	__tablename__ = "views"
	# attributes
	month = db.Column(db.Integer(), nullable=False, primary_key=True)
	year = db.Column(db.Integer(), nullable=False, primary_key=True)
	views = db.Column(db.Integer(), nullable=False)

	# Part of composite key (qualifier)
	propertyListingId = db.Column(db.String(250), db.ForeignKey("PropertyListing.id"), nullable=False, primary_key=True)
	viewsToPropertyListingRel = db.relationship("PropertyListing", back_populates="propertyListingToViewsRel", cascade="all, delete, save-update",
									foreign_keys="Views.propertyListingId")

	@classmethod
	def findPropertyViews(cls, propertyId:str) -> list[Self]:
		"""
		Queries all Views for a specified property, takes in arguments:
			- propertyId:str, 
		returns an list of Views instance.
		"""
		return cls.query.filter_by(propertyListingId=propertyId).all()

	@classmethod
	def incrementViews(cls, id:str) -> bool:
		with current_app.app_context():
			today = date.today()
			views = Views.query.filter_by(propertyListingId=id, month=today.month, year=today.year).one_or_none()
			# if views for a property at a certain time doesn't exist, create new views record
			if not views:
				newViews = cls(propertyListingId=id, month=today.month, year=today.year, views=1) # type: ignore
				db.session.add(newViews)
			# else increment views by 1
			else:
				views.views = views.views + 1
			db.session.commit()
		return True