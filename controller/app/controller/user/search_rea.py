# Libraries
from flask import Blueprint, request
from flask_jwt_extended import jwt_required

# Local dependencies
from app.entity import User, Suspension, UserProfile
from app.controller.authentication import permissions_required

class SearchREAController(Blueprint):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    self.add_url_rule("/search_rea", view_func=self.searchREA, methods=["GET"])
  
  @permissions_required("has_buying_permission", "has_selling_permission")
  @jwt_required()
  def searchREA(self):
    list_of_reas = list()
    
    for agent in User.queryAllREA():
      profile = UserProfile.queryUP(agent.profile)
      if not profile.has_listing_permission:
        continue
      suspension = Suspension.getOngoingSuspension(agent)
      if not suspension:
        list_of_reas.append({
          "email": agent.email, 
          "phone": agent.phone, 
          "first_name": agent.first_name, 
          "last_name": agent.last_name, 
          "profile": agent.profile,
          "suspended": False
        })
      else:
        list_of_reas.append({
          "email": agent.email, 
          "phone": agent.phone, 
          "first_name": agent.first_name, 
          "last_name": agent.last_name, 
          "profile": agent.profile,
          "suspended": True,
          "suspension_end": None if not suspension.end else suspension.end.strftime("%m/%d/%Y")
        })

    return {"agents" : list_of_reas}
    
    
    