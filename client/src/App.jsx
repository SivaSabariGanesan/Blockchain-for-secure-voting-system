import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css'

const socket = io('http://127.0.0.1:5000');  // Flask backend URL

function App() {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    socket.on('face_detected', (data) => {
      setNotification(data.message);
      setTimeout(() => setNotification(''), 2000);  // Clear message after 2 seconds
    });
  }, []);

  return (
    <div className="App">
      <h1>Face Detection Using Flask, OpenCV, and React</h1>
     <div className='video-feed'>
          <img src="http://127.0.0.1:5000/video_feed" alt="Video Feed" width="640" height="480" />
     </div>
     <div className='face-alert'>
           {notification && <h2>{notification}</h2>}
    </div>
    </div>
  );
}

export default App;
