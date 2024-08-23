from flask import Blueprint, jsonify
from server.app.database.add_data import fill_dummy_data

add_data_v1 = Blueprint('add_data_v1', 'add_data_v1', url_prefix='/api/add-data')

@add_data_v1.route('/add', methods=["GET"])
def api_add_ata():
    try:
        fill_dummy_data()
        return jsonify({'success': 'Data added'}), 200
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred while adding data. Please try again later.'}), 500
