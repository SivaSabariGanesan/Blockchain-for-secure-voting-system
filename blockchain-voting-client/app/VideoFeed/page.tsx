import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
interface FaceDetectedData {
    message: string;
}

const VideoFeed: React.FC = () => {
    const [faceCount, setFaceCount] = useState<number>(0);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketConnection = io('http://127.0.0.1:5001');
        setSocket(socketConnection);
        socketConnection.on('face_detected', (data: FaceDetectedData) => {
            console.log(data);
            console.log(data.message);
            const numFaces = parseInt(data.message.split(' ')[0], 10);
            setFaceCount(numFaces);
        });
        return () => {
            socketConnection.disconnect();
        };
    }, []);

    return (
        <div className="video-feed-container">
            <h2>Face Count: {faceCount}</h2>
            <img
                src="http://127.0.0.1:5001/video_feed"
                alt="Video Feed"
                style={styles.video}
            />
        </div>
    );
};

export default VideoFeed;
const styles = {
    videoContainer: {
      position: 'relative',
      display: 'inline-block',
    } as React.CSSProperties,
    video: {
      width: '640px',
      height: '480px',
      border: '2px solid #000',
    } as React.CSSProperties,
  };