import os 
from dotenv import load_dotenv
from datetime import timedelta # type: ignore

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
	SECRET_KEY = os.environ.get('SECRET_KEY') or 'default-flask-secret-key'
	# Database configurations
	SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)