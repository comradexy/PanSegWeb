import base64
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/bin/<f_name>', methods=['GET'])
def get_bin(f_name):
    with open('./src/pcd/' + f_name, 'rb') as f:
        return jsonify({'data': base64.b64encode(f.read()).decode('utf-8')})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
