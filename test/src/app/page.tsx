'use client'

import { useRouter } from "next/navigation";
import { Tooltip as ReactTooltip } from "react-tooltip";


export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 gap-4	">
      <button className="bg-orange-700	p-8 rounded-full" data-tooltip-id="my-tooltip-1" onClick={() => router.push('/chat-socket-io')}></button>
      <button className="bg-orange-700	p-8 rounded-full" data-tooltip-id="my-tooltip-2" onClick={() => router.push('/chat-talk-js')}></button>
      <ReactTooltip
        id="my-tooltip-1"
        place="bottom"
        content="Chat by Socket.io"
      />
      <ReactTooltip
        id="my-tooltip-2"
        place="bottom"
        content="Chat by Talkjs"
      />
      <button className="bg-orange-700	p-8"  onClick={() => router.push('/ui-stream/create-live')}>Create Live</button>
      <button className="bg-orange-700	p-8"  onClick={() => router.push('/ui-stream/join-live')}>Join Live</button>
    </main>
  );
}


