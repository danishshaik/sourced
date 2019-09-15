from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os

app = Flask(__name__)
# CORS(app, resources={r"*": {"origins": "http://18.144.66.128/"}})
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
parentdir = os.path.abspath(os.path.join(__file__ ,"../.."))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + parentdir + '/persistent/db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

from sourced import routes