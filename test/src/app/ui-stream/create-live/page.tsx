'use client'

import useBroadCastSocket from '@/app/utils/hooks/useBroadCastSocket';
import React, { useEffect, useState } from 'react';

const audioUrl = 'https://v16-media.soundmosaic.pixelynx-ai.com/base_bass_clips1_2023-25-8_122548/3f12ce92.mp3'

export default function CreateLive() {
    const [isPlaying, setIsPlaying] = useState(false);
    const { emitAction } = useBroadCastSocket();

    const recordAction = (action: any) => {
        emitAction('message', { message: action })
    }

    useEffect(() => {
        recordAction({ audioUrl: audioUrl, isPlaying: false })
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-2 bg-gray-100	">
            <h1 className='text-black'>Create Live</h1>
            <audio
                controls
                src={audioUrl}
                autoPlay={isPlaying}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
            />
            <button className='bg-orange-700 p-4' onClick={() => {setIsPlaying(!isPlaying), recordAction({ audioUrl: audioUrl, isPlaying: !isPlaying })}}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </main>
    );
}


