from flask import Flask, Response, jsonify, request
from flask_socketio import SocketIO
from flask_cors import CORS
import cv2
import smtplib
import random
from email.message import EmailMessage

app = Flask(__name__)
CORS(app)  # Enable CORS for both face detection and OTP features
socketio = SocketIO(app, cors_allowed_origins="*")

# Load the DNN model
net = cv2.dnn.readNetFromCaffe('deploy.prototxt', 'res10_300x300_ssd_iter_140000.caffemodel')

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

def gen_frames():
    camera = cv2.VideoCapture(0)  # Capture video from the webcam
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Prepare the image for DNN processing
            h, w = frame.shape[:2]
            blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0,
                                         (300, 300), (104.0, 177.0, 123.0))
            net.setInput(blob)
            detections = net.forward()

            # Count the number of faces
            num_faces = 0

            # Process detections
            for i in range(detections.shape[2]):
                confidence = detections[0, 0, i, 2]
                if confidence > 0.5:  # Confidence threshold
                    num_faces += 1
                    box = detections[0, 0, i, 3:7] * [w, h, w, h]
                    (startX, startY, endX, endY) = box.astype("int")
                    cv2.rectangle(frame, (startX, startY), (endX, endY), (255, 0, 0), 2)
            print(num_faces)
            socketio.emit('face_detected', {'message': f'{num_faces} face(s) detected!'})

            # Encode the frame as a JPEG image
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/count_faces', methods=['GET'])
def count_faces():
    camera = cv2.VideoCapture(0)
    success, frame = camera.read()
    if not success:
        return jsonify({'error': 'Could not read frame'}), 500
    
    # Prepare the image for DNN processing
    h, w = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)), 1.0,
                                 (300, 300), (104.0, 177.0, 123.0))
    net.setInput(blob)
    detections = net.forward()

    # Count the number of faces
    num_faces = 0
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > 0.5:
            num_faces += 1
    
    return jsonify({'num_faces': num_faces})

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
    socketio.run(app, debug=True, port=5001)
