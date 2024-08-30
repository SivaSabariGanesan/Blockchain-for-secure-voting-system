from flask import Flask, request, render_template, redirect, url_for
from flask_cors import CORS

# OPEN CV DEPENDENCIES
# from flask_socketio import SocketIO, emit
# import cv2

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend communication

# OPEN CV 
# socketio = SocketIO(app, cors_allowed_origins="*")

# Simulated user database
database = {'wuj2264831': '9360832153', 'wuj2156832': '8248901129', 'wuz1507012': '9363085830'}

@app.route('/')
def hello_world():
    return render_template("login.html")

@app.route('/form_login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        name1 = request.form.get('username')
        pwd = request.form.get('password')

        # Check if username or password is empty
        if not name1 or not pwd:
            return render_template('login.html', info='Please enter both username and password')

        # User validation
        if name1 not in database:
            return render_template('login.html', info='Invalid Username')
        elif database[name1] != pwd:
            return render_template('login.html', info='Invalid Password')
        else:
            return render_template('home.html', name=name1)

    # If the request method is GET, redirect to the login page
    return redirect(url_for('hello_world'))

# --- OPEN CV START --- #
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# def gen_frames():
#     camera = cv2.VideoCapture(0)  # Capture video from the webcam
#     while True:
#         success, frame = camera.read()
#         if not success:
#             break
#         else:
#             gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#             faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
#             if len(faces) > 0:
#                 socketio.emit('face_detected', {'message': 'Face detected!'})
#             for (x, y, w, h) in faces:
#                 cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
#             ret, buffer = cv2.imencode('.jpg', frame)
#             frame = buffer.tobytes()
#             yield (b'--frame\r\n'
#                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# @app.route('/video_feed')
# def video_feed():
#     return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
# --- OPEN CV END --- #

if __name__ == '__main__':
    app.run(debug=True,port=5001)
