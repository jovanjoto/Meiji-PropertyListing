# Libraries
from flask import Flask
from config import Config 
from app.entity import db
from controller.Profile import profile_bp
from controller.Suspension import suspension_bp
from controller.User import user_bp


# Initialize Flask App
flask_app = Flask(__name__)
flask_app.config.from_object(Config)

# SQLAlchemy
db.init_app(flask_app)
with flask_app.app_context():
	db.create_all()

# Load all routes
flask_app.register_blueprint(profile_bp, url_prefix='/profile') 
flask_app.register_blueprint(suspension_bp, url_prefix='/suspension')
flask_app.register_blueprint(user_bp, url_prefix='/user')
# attach yall blueprints here