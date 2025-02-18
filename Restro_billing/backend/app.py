from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

load_dotenv()  

app = Flask(__name__)



app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

from routes.orders import order_routes
from routes.menu import menu_routes

app.register_blueprint(order_routes, url_prefix="/orders")
app.register_blueprint(menu_routes, url_prefix="/menu")

if __name__ == "__main__":
    app.run(debug=True)
