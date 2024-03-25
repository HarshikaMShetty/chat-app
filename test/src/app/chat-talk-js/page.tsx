'use client'

import React, { useCallback } from 'react';
import { Session, Chatbox } from '@talkjs/react';
import Talk from 'talkjs'


function generateRandomString(length = 2) 
{ 
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    let result = ''; 
    for (let i = 0; i < length; i++) { 
        result += characters.charAt(Math.floor(Math.random() * characters.length)); 
    } return result;
}

export default function ChatBox() {
    const syncUser = useCallback(
        () => 
            new Talk.User({
                id: `${generateRandomString()}`, //user details to be fetched from API
                name: `Guest ${generateRandomString()}`,
                role: 'default',
            }),
        []
    );
    const syncConversation = useCallback((session: { getOrCreateConversation: (arg0: string) => any; }) => {
        const conversation = session.getOrCreateConversation(process.env.NEXT_PUBLIC_CHAT_CONVERSATION_ID ?? "");
        return conversation;
    }, []);

    return (
        <main className="flex h-screen flex-col items-start justify-end bg-live-chat bg-no-repeat bg-cover	">
            <Session appId={process.env.NEXT_PUBLIC_CHAT_APP_ID ?? ""} syncUser={syncUser}>
                <Chatbox
                    syncConversation={syncConversation}
                    style={{ width: '30%', height: '40%', marginLeft: "1rem", border: "none" }}
                    asGuest={true}
                    showChatHeader={false}
                >
                </Chatbox>;
            </Session>
        </main>
    );
}


