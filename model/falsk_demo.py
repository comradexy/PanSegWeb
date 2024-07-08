import base64
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/model/test/<f_type>/<f_name>', methods=['GET'])
def download_file(f_type, f_name):
    try:
        # 读取文件并进行 base64 编码
        f_path = './src/' + f_type + '/' + f_name
        with open(f_path, 'rb') as file:
            file_data = file.read()
            encoded_data = base64.b64encode(file_data).decode('utf-8')

        # 返回编码后的数据
        return jsonify({'filename': f_name, 'file_data': encoded_data})

    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404


if __name__ == '__main__':
    app.run(debug=True, port=5000)
