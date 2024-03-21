'use client'

import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';


const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function Home() {

  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<any>([]);


  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "");

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    setSocket(socketInstance);
    return () => {
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleReceivedMessage = (message: { socket_id: string | number; message: any; }) => {
      const color = generateRandomColor()
      setReceivedMessages((prevMessages: any) => [...prevMessages, { ...message, color }]);
    };

    socket.on('message_response', handleReceivedMessage);

    return () => {
      socket.off('message_response', handleReceivedMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    console.log('Sending message')
    if (socket) {
      console.log(message);
      socket.emit('message', { message: message });
      setMessage('');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Socket Connection
      </h1>
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        {receivedMessages && <div>
          {receivedMessages.map(({ message, color, socket_id } : any, index : any) => (
            <div key={index} style={{ color: color }}>
              <p>{socket_id}: {message}</p>
            </div>
          ))}
        </div>}
        <div className="flex">
          <input
            className="w-full rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white px-2 py-2"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </main>
  );
}


