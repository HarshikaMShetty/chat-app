'use client'

import React, { useEffect, useState } from 'react';
import useBroadCastSocket from '../utils/hooks/useBroadCastSocket';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function Home() {

  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<any>([]);

  const { action, emitAction } = useBroadCastSocket('message_response');

  useEffect(() => {
    if(action){
      const color = generateRandomColor()
      setReceivedMessages((prevMessages: any) => [...prevMessages, { ...action, color }]);
    }
  }, [action]);

  const sendMessage = () => {
    emitAction('message', {message:message})
    setMessage('');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 pl-4 bg-gray-100	">
      <h1 className='text-black font-medium'>
        Socket Connection
      </h1>
      <div className="flex flex-col self-start rounded-lg p-4 mb-4 gap-2 bg-slate-900 h-[30vh] justify-between	">
        <button className='w-fit text-3xl leading-[0]'>-</button>
        {receivedMessages && <div className='flex flex-col gap-4 h-full overflow-y-auto'>
          {receivedMessages.map(({ message, color, socket_id }: any, index: any) => (
            <div key={index} className='p-2 bg-slate-200 w-fit rounded-md	' >
              <p className='font-medium text-xs' style={{ color: color }}>{socket_id}: <span className='text-black	'>{message}</span></p>
            </div>
          ))}
        </div>}
        <div className="flex">
          <input
            className="w-full rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white px-2 py-2 focus-visible:outline-none"
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


