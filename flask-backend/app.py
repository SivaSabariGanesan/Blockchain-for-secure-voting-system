import smtplib
import random
from email.message import EmailMessage
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend communication

# Simulated user database with NFT tokens
database = {'wuj2264831': 'NFT_TOKEN_123', 'wuj2156832': 'NFT_TOKEN_456', 'wuz1507012': 'NFT_TOKEN_789'}

# Your email credentials
EMAIL_ADDRESS = '230701321@rajalakshmi.edu.in'
EMAIL_PASSWORD = 'rwar xnoi kabn vjwm'

def send_otp(to_email):
    otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])

    msg = EmailMessage()
    msg['Subject'] = 'OTP Verification'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg.set_content(f'Your OTP is: {otp}')

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
        return otp
    except Exception as e:
        print(f"Error sending email: {e}")
        return None

@app.route('/api/send_otp', methods=['POST'])
def send_otp_route():
    data = request.json
    username = data.get('username')
    nft_token = data.get('nft_token')
    email = data.get('email')

    # Validate the user
    if username not in database or database[username] != nft_token:
        return jsonify({'error': 'Invalid Username or NFT Token'}), 400

    otp = send_otp(email)
    if otp:
        return jsonify({'otp': otp}), 200
    else:
        return jsonify({'error': 'Error sending OTP. Please try again.'}), 500

@app.route('/api/verify_otp', methods=['POST'])
def verify_otp():
    data = request.json
    user_otp = data.get('otp')
    original_otp = data.get('original_otp')

    if user_otp == original_otp:
        return jsonify({'message': 'OTP verified successfully'}), 200
    else:
        return jsonify({'error': 'Invalid OTP'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)