from flask import Blueprint, request, jsonify
from app import mongo
from models import serialize_order

order_routes = Blueprint("order_routes", __name__)

@order_routes.route("/place", methods=["POST"])
def place_order():
    data = request.json
    customer_name = data.get("customer_name")
    items = data.get("items")
    total_price = sum(item["price"] for item in items)

    order_id = mongo.db.orders.insert_one({
        "customer_name": customer_name,
        "items": items,
        "total_price": total_price,
        "status": "pending"
    }).inserted_id

    return jsonify({"message": "Order placed!", "order_id": str(order_id)}), 201
