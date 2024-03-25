import { useSocket } from "@/app/provider/socket";
import { useCallback, useEffect, useState } from "react";

export default function useBroadCastSocket(event: string) {
    const { socket, isConnected, connectSocket } = useSocket();
    const [action, setAction] = useState<any>(null);

    useEffect(() => {
        if (!socket) return; // If the socket is not available, exit early to avoid setting up event listeners
        const handleReceivedAction = (data: any) => {
            setAction(data);
        };
        socket.on(event, handleReceivedAction); // Assuming actions related to a particular component or page are handled using a single event
        return () => {
            socket.off(event, handleReceivedAction);
        };
    }, [socket, event]);

    const emitAction = useCallback(
        (event: string, action: any) => {
            if (!isConnected) {
                connectSocket();
            }
            else {
                console.log("sending", action)
                socket.emit(event, action);
            }
        },
        [isConnected]
    );

    return { action, emitAction };
}
