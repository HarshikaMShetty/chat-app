'use client'

import useBroadCastSocket from '@/app/utils/hooks/useBroadCastSocket';
import React, { useEffect, useState } from 'react';

export default function JoinLive() {

  const [actionData, setActionData] = useState({audioUrl: "", isPlaying: false});
  const { action } = useBroadCastSocket('message_response');


  useEffect(() => {
    if(action){
      setActionData({...action.message})
    }
  }, [action]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gray-100	">
      <h1 className='text-black'>Join Live</h1>
      <audio
        controls
        src={actionData.audioUrl}
        autoPlay={actionData.isPlaying}
        onPause={() => setActionData({...actionData, isPlaying: false})}
        onPlay={() => setActionData({...actionData, isPlaying: true})}
      />
      <button className='bg-orange-700	p-4' onClick={() => {}}>
        {actionData.isPlaying ? 'Pause' : 'Play'}
      </button>
    </main>
  );
}


