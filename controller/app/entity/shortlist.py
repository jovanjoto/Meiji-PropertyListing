# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore

# Local dependencies
from .sqlalchemy import db
from .propertylisting import PropertyListing

# Shortlist Schema
class Shortlist(db.Model):
	__tablename__ = "shortlist"
	# Composite key 
	propertyListingId = db.Column(db.String(250), db.ForeignKey("PropertyListing.id"), nullable=False, primary_key=True)
	userEmail = db.Column(db.String(250), db.ForeignKey("User.email"), nullable=False, primary_key=True)
	shortlistToPropertyListingRel = db.relationship("PropertyListing", back_populates="propertyListingToShortlistRel", cascade="all, delete, save-update",
									foreign_keys="Shortlist.propertyListingId")
	shortlistToBuyerRel = db.relationship("User", back_populates="buyerToShortlistRel", cascade="all, delete, save-update",
									foreign_keys="Shortlist.userEmail")

	@classmethod
	def countPropertyShortlists(cls, propertyId:str) -> int:
		"""
		Gets the number of shortlists for a property id, takes in arguments:
			- propertyId:str, 
		returns an int.
		"""
		return cls.query.filter_by(propertyListingId=propertyId).count()

	@classmethod
	def createPropertyShortlist(cls, propertyId:str, buyerEmail:str) -> bool:
		"""
		Creates a new Shortlist for new property by passing arguments:
		- propertyId:str,
		- buyerEmail:str
		returns bool.
		"""
		try:
			# Initialize new shortlist
			newShortlist = cls(propertyListingId=propertyId, userEmail=buyerEmail) # type: ignore
			# Commit to DB
			with current_app.app_context():
				db.session.add(newShortlist)
				db.session.commit()
			return True
		except:
			return False


	@classmethod
	def removeShortlist(cls, propertyId:str, buyerEmail:str) -> bool:
		"""
		Creates a new Shortlist for new property by passing arguments:
		- propertyId:str,
		- buyerEmail:str
		returns bool.
		"""
		# Shortlist doesn't exist
		with current_app.app_context():
			shortlist = cls.query.filter_by(propertyListingId=propertyId).one_or_none()
			if not shortlist:
				return False
			
			# Delete shortlist
			cls.query.filter_by(propertyListingId=propertyId).delete()
			db.session.commit()
			return True

	@classmethod
	def checkIfShortlisted(cls, listing:PropertyListing, email:str) -> bool:
		"""
		Checks if property is shortlisted by a buyer by passing arguments:
		- listing:PropertyListing,
		- email:str
		returns bool.
		"""
		shortlist = cls.query.filter_by(propertyListingId=listing.id, userEmail=email).one_or_none()
		if shortlist:
			return True
		return False