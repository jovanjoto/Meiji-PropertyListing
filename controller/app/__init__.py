# Libraries
from flask import Flask
from config import Config 
from app.entity import db

# Initialize Flask App
flask_app = Flask(__name__)
flask_app.config.from_object(Config)

# SQLAlchemy
db.init_app(flask_app)
with flask_app.app_context():
	db.create_all()

# Load all routes
# attach yall blueprints here