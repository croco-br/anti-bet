
from flask import Flask, jsonify, render_template, request
import engine

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html') 

@app.route('/calculate', methods=['POST'])
def calculate_simulation():
    data = request.json
    simulation_data = engine.simulate( data.get('quantity'),data.get('house_value'), data.get('value'))
    return jsonify(simulation_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)