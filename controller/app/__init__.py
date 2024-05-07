# Libraries
from flask import Flask

# Local dependencies
from config import Config
from app.entity import db, User, UserProfile, PropertyListing
from .controller.user import view_user_controller, search_user_controller, update_user_controller, create_user_controller
from .controller.suspension import get_suspension_controller, suspend_user_controller, suspend_profile_controller
from .controller.profile import view_profile_controller, search_profile_controller, update_profile_controller, create_profile_controller
from .controller.authentication import jwt, bcrypt, mail, login_controller, reset_password_controller
from .controller.property_listing import *
from .controller.shortlist import *
from .controller.views import *
from .controller.rating import view_rating_controller, rate_agent_controller
from .controller.review import view_review_controller, review_agent_controller

# Initialize Flask App
flask_app = Flask(__name__)
flask_app.config.from_object(Config)
# JWT
jwt.init_app(flask_app)
# BCrypt
bcrypt.init_app(flask_app)
# Mail
mail.init_app(flask_app)

# SQLAlchemy
db.init_app(flask_app)
with flask_app.app_context():
	db.create_all()
	# Create admin profile
	if not UserProfile.queryUP("Admin"):
		profile = UserProfile(
			name="Admin", 
			description="Admin profile", 
			has_admin_permission=True
		) # type: ignore
		db.session.add(profile)
	# Create admin acc
	if not User.queryUserAccount("admin@admin.com"):
		user = User(email="admin@admin.com",
			phone="87434921", 
			password=bcrypt.generate_password_hash("admin"), 
			first_name="Admin", 
			last_name="Istrator", 
			profile="Admin"
		) # type: ignore
		db.session.add(user)
		db.session.commit()

# Load all routes

# Authentication
flask_app.register_blueprint(login_controller, url_prefix='/api/authentication')
flask_app.register_blueprint(reset_password_controller, url_prefix='/api/authentication')

# Suspension
flask_app.register_blueprint(get_suspension_controller, url_prefix='/api/suspension')
flask_app.register_blueprint(suspend_profile_controller, url_prefix='/api/suspension')
flask_app.register_blueprint(suspend_user_controller, url_prefix='/api/suspension')

# User
flask_app.register_blueprint(create_user_controller, url_prefix='/api/user')
flask_app.register_blueprint(view_user_controller, url_prefix='/api/user')
flask_app.register_blueprint(update_user_controller, url_prefix='/api/user')
flask_app.register_blueprint(search_user_controller, url_prefix='/api/user')

# User Profile
flask_app.register_blueprint(create_profile_controller, url_prefix='/api/profile')
flask_app.register_blueprint(view_profile_controller, url_prefix='/api/profile')
flask_app.register_blueprint(update_profile_controller, url_prefix='/api/profile')
flask_app.register_blueprint(search_profile_controller, url_prefix='/api/profile')

# Property Listing
flask_app.register_blueprint(create_property_listing_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(mark_sold_property_listing_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(remove_property_listing_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(update_property_listing_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(view_property_listing_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(view_buyer_property_listing_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(search_managed_pl_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(search_new_pl_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(search_sold_pl_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(search_owned_pl_controller, url_prefix='/api/property_listing')
flask_app.register_blueprint(view_stats_controller, url_prefix='/api/property_listing')

# Shortlist
flask_app.register_blueprint(shortlist_property_controller, url_prefix='/api/shortlist')
flask_app.register_blueprint(remove_shortlist_controller, url_prefix='/api/shortlist')
flask_app.register_blueprint(count_shortlist_controller, url_prefix='/api/shortlist')

# Views
flask_app.register_blueprint(count_views_controller, url_prefix='/api/views')

# Ratings
flask_app.register_blueprint(view_rating_controller, url_prefix='/api/rating')
flask_app.register_blueprint(rate_agent_controller, url_prefix='/api/rating')

# Reviews
flask_app.register_blueprint(view_review_controller, url_prefix='/api/review')
flask_app.register_blueprint(review_agent_controller, url_prefix='/api/review')