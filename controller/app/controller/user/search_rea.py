# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import User, Suspension, UserProfile, Rating
from app.controller.authentication import permissions_required

class SearchREAController(Blueprint):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.add_url_rule("/search_rea", view_func=self.searchREA, methods=["GET"])
  
  @permissions_required("has_buying_permission", "has_selling_permission")
  @jwt_required()
  def searchREA(self):
    list_of_reas = list()
    
    agents = User.queryREA()
    
    for agent in agents:
      avgRating = Rating.getAvgRating(agent.email)
      
      rea = {
        "email" : agent.email,
        "phone" : agent.phone, 
        "first_name" : agent.first_name,
        "last_name" : agent.last_name,
        "profile" : agent.profile,
        "avg_rating" : avgRating
      }
      
      list_of_reas.append(rea)

    return {"success" : True, "results" : list_of_reas}
    
    
    