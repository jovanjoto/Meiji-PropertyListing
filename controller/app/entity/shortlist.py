# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore

# Local dependencies
from .sqlalchemy import db
from .propertylisting import PropertyListing
from .user import User

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
    def createNewPropertyShortlist(cls, propertyId:str, buyerEmail:str) -> bool:
        """
        Creates a new Shortlist for new property by passing arguments:
        - propertyId:str,
        - buyerEmail:str
        returns bool.
        """
        # Property doesn't exist
        propertyListing = PropertyListing.queryPL(propertyId)
        if not propertyListing:
            return False
        # Property listing is already sold 
        if propertyListing.is_sold:
            return False
        # Buyer doesn't exist
        buyer = User.queryUserAccount(buyerEmail)
        if not buyer:
            return False
        # User is not a buyer
        if buyer.profile != "Buyer":
            return False
        
        # Initialize new shortlist
        newShortlist = cls(propertyListingId=propertyId, userEmail=buyerEmail)
        # Commit to DB
        with current_app.app_context():
            db.session.add(newShortlist)
            db.session.commit()
        return True
    
    @classmethod
    def createSoldPropertyShortlist(cls, propertyId:str, buyerEmail:str) -> bool:
        """
        Creates a new Shortlist for sold property by passing arguments:
        - propertyId:str,
        - buyerEmail:str
        returns bool.
        """
        # Property doesn't exist
        propertyListing = PropertyListing.queryPL(propertyId)
        if not propertyListing:
            return False
        # Property listing is not yet sold 
        if propertyListing.is_sold == False:
            return False
        # Buyer doesn't exist
        buyer = User.queryUserAccount(buyerEmail)
        if not buyer:
            return False
        # User is not a buyer
        if buyer.profile != "Buyer":
            return False
        
        # Initialize new shortlist
        soldShortlist = cls(propertyListingId=propertyId, userEmail=buyerEmail)
        # Commit to DB
        with current_app.app_context():
            db.session.add(soldShortlist)
            db.session.commit()
        return True
    
    @classmethod
    def removeShortlistNew(cls, propertyId:str, buyerEmail:str) -> bool:
        """
        Creates a new Shortlist for new property by passing arguments:
        - propertyId:str,
        - buyerEmail:str
        returns bool.
        """
        # Shortlist doesn't exist
        shortlist = cls.query.filter_by(id=propertyId).one_or_none()
        if not shortlist:
            return False
        # Delete shortlist
        with current_app.app_context():
            shortlist.delete()
            db.session.commit()
        return True
    
    @classmethod
    def removeShortlistSold(cls, propertyId:str, buyerEmail:str) -> bool:
        """
        Creates a new Shortlist for sold property by passing arguments:
        - propertyId:str,
        - buyerEmail:str
        returns bool.
        """
        # Shortlist doesn't exist
        shortlist = cls.query.filter_by(id=propertyId).one_or_none()
        if not shortlist:
            return False
        # Delete shortlist
        with current_app.app_context():
            shortlist.delete()
            db.session.commit()
        return True