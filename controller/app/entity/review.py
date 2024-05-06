# Libraries
from flask import current_app
from typing_extensions import Self # type: ignore

# Local dependencies
from .sqlalchemy import db
from .user import User

# Review Schema
class Review(db.Model):
    __tablename__ = "review"
    # attributes
    review = db.Column(db.String(10000), nullable=False)
    # Composite key 
    agentEmail = db.Column(db.String(250), db.ForeignKey("User.email"), nullable=False, primary_key=True)
    reviewerEmail = db.Column(db.String(250), db.ForeignKey("User.email"), nullable=False, primary_key=True)
    reviewToAgentRel = db.relationship("User", back_populates="reviewToAgentRel", cascade="all, delete, save-update",
                                   foreign_keys="Review.agentEmail")
    reviewToReviewerRel = db.relationship("User", back_populates="reviewToReviewerRel", cascade="all, delete, save-update",
                                   foreign_keys="Review.reviewerEmail")
    
    @classmethod
    def queryAllReview(cls, email:str) -> list[Self]:
        """
        Queries all Reviews for a specified agent, takes in arguments:
            - email:str, 
        returns an list of Review instance.
        """
        return cls.query.filter_by(agentEmail=email).all()

    @classmethod
    def createReview(cls, agent_email:str, reviewer_email:str, review:str) -> bool:
        """
        Creates a new Review by passing arguments:
        - agent_email:str,
        - phone:str, 
        - reviewer_email:str, 
        - review:str
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
        reviewer = User.queryUserAccount(email=reviewer_email)
        if not reviewer:
            return False
        # Email entered for rater isn't buyer or seller
        if reviewer.profile != "Buyer" or reviewer.profile != "Seller":
            return False
        
        # Initialize new review
        newReview = cls(agentEmail=agent_email, reviewerEmail=reviewer_email, review=review)
        # Commit to DB
        with current_app.app_context():
            db.session.add(newReview)
            db.session.commit()
        return True