import random
import smtplib
from email.message import EmailMessage
from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

# Simulated user database with NFT tokens
database = {'wuj2264831': 'NFT_TOKEN_123', 'wuj2156832': 'NFT_TOKEN_456', 'wuz1507012': 'NFT_TOKEN_789'}

def send_otp(to_mail):
    otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    from_mail = '230701321@rajalakshmi.edu.in'
    server.login(from_mail, 'rwar xnoi kabn vjwm')
    
    msg = EmailMessage()
    msg['Subject'] = "OTP Verification"
    msg['From'] = from_mail
    msg['To'] = to_mail
    msg.set_content(f"Your OTP is: {otp}")
    server.send_message(msg)
    server.quit()
    
    return otp

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Step 1: Get voter ID, NFT token, and email
        username = request.form.get('username')
        nft_token = request.form.get('nft_token')
        email = request.form.get('email')
        
        # Validate the input
        if not username or not nft_token or not email:
            return render_template('index.html', info='Please fill in all fields', step=1)

        if username not in database or database[username] != nft_token:
            return render_template('index.html', info='Invalid Username or NFT Token', step=1)
        
        # Step 2: Send OTP
        otp = send_otp(email)
        return render_template('index.html', step=2, email=email, otp=otp, username=username)

    return render_template('index.html', step=1)

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    user_otp = request.form.get('otp')
    original_otp = request.form.get('original_otp')
    username = request.form.get('username')
    email = request.form.get('email')

    if user_otp == original_otp:
        return render_template('home.html', name=username)
    else:
        return render_template('index.html', step=2, otp=original_otp, username=username, email=email, info='Invalid OTP')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
