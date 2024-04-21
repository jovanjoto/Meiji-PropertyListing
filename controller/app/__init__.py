# Libraries
from flask import Flask
from config import Config

# Local dependencies
from app.entity import db
from controller.UserController import router as user_controller_bp
from controller.SuspensionController import router as suspension_controller_bp
from controller.ProfileController import router as profile_controller_bp

# Initialize Flask App
flask_app = Flask(__name__)
flask_app.config.from_object(Config)

# SQLAlchemy
db.init_app(flask_app)
with flask_app.app_context():
	db.create_all()

# Load all routes
flask_app.register_blueprint(user_controller_bp, url_prefix='/api/user')
flask_app.register_blueprint(suspension_controller_bp, url_prefix='/api/suspension')
flask_app.register_blueprint(profile_controller_bp, url_prefix='/api/profile')
# attach yall blueprints here