import os
import uuid
from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)


app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/restaurant_billing")
mongo = PyMongo(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/menu", methods=["GET"])
def get_menu():
    menu_items = list(mongo.db.menu.find())
    for item in menu_items:
        item["_id"] = str(item["_id"])  
    return jsonify(menu_items), 200

app.route("/api/menu", methods=["POST"])
def add_menu_item():
    data = request.get_json()
    name = data.get("name")
    price = data.get("price")
    image_url = data.get("image_url", "")
    
    if not name or price is None:
        return jsonify({"error": "Name and price are required"}), 400

    new_item = {
        "name": name,
        "price": float(price),
        "image_url": image_url
    }
    result = mongo.db.menu.insert_one(new_item)
    return jsonify({"message": "Menu item added", "id": str(result.inserted_id)}), 201

@app.route("/api/orders", methods=["POST"])
def place_order():
    data = request.get_json()
    customer_name = data.get("customer_name", "Guest")
    items = data.get("items")
    total = data.get("total")
    
    if not items or total is None:
        return jsonify({"error": "Order must include items and total amount"}), 400

    order_id = str(uuid.uuid4())
    new_order = {
        "order_id": order_id,
        "customer_name": customer_name,
        "items": items,
        "total": float(total),
        "status": "placed"
    }
    mongo.db.orders.insert_one(new_order)
    return jsonify({"message": "Order placed", "order_id": order_id}), 201


@app.route("/api/payments", methods=["POST"])
def record_payment():
    data = request.get_json()
    order_id = data.get("order_id")
    amount = data.get("amount")
    payment_method = data.get("payment_method", "cash")
    
    if not order_id or amount is None:
        return jsonify({"error": "order_id and amount are required"}), 400

    payment = {
        "order_id": order_id,
        "amount": float(amount),
        "payment_method": payment_method,
        "status": "paid"
    }
    mongo.db.payments.insert_one(payment)
    
    mongo.db.orders.update_one({"order_id": order_id}, {"$set": {"status": "paid"}})
    return jsonify({"message": "Payment recorded", "order_id": order_id}), 201

if __name__ == "__main__":
    app.run(debug=True)
