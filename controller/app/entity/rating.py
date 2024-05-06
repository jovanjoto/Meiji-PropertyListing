# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore

# Local dependencies
from .sqlalchemy import db
from .user import User

# Review Schema
class Rating(db.Model):
    __tablename__ = "rating"
    # attributes
    rating = db.Column(db.Float(), nullable=False)
    # Composite key 
    agentEmail = db.Column(db.String(250), db.ForeignKey("User.email"), nullable=False, primary_key=True)
    raterEmail = db.Column(db.String(250), db.ForeignKey("User.email"), nullable=False, primary_key=True)
    ratingToAgentRel = db.relationship("User", back_populates="agentToRatingRel", cascade="all, delete, save-update",
                                    foreign_keys="Rating.agentEmail")
    ratingToRaterRel = db.relationship("User", back_populates="raterToRatingRel", cascade="all, delete, save-update",
                                    foreign_keys="Rating.raterEmail")

    @classmethod
    def queryAllREARating(cls, email:str) -> list[Self]:
        """
        Queries all Ratings for a specified agent, takes in arguments:
            - email:str, 
        returns an list of Rating instance.
        """
        return cls.query.filter_by(agentEmail=email).all()

    @classmethod
    def createRating(cls, agent_email:str, rater_email:str, rating:float) -> bool:
        """
        Creates a new Rating by passing arguments:
        - agent_email:str,
        - phone:str, 
        - rater_email:str, 
        - rating:float
        returns bool.
        """
        # Agent doesn't exist 
        agent = User.queryUserAccount(email=agent_email)
        if not agent:
            return False
        # Email entered for agent isn't actually an agent
        if agent.profile != "Real Estate Agent":
            return False
        # Rater doesn't exist
        rater = User.queryUserAccount(email=rater_email)
        if not rater:
            return False
        # Email entered for rater isn't buyer or seller
        if rater.profile != "Buyer" or rater.profile != "Seller":
            return False
        
        # Initialize new rating
        newRating = cls(agentEmail=agent_email, raterEmail=rater_email, rating=rating)
        # Commit to DB
        with current_app.app_context():
            db.session.add(newRating)
            db.session.commit()
        return True
