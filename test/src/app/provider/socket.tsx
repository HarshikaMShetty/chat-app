"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import { io as ClientIO } from "socket.io-client";

type ContextType = {
    socket: any | null; //change type
    isConnected: boolean;
    connectSocket: Function, 
};

const SocketContext = createContext<ContextType>({
    socket: null,
    isConnected: false,
    connectSocket: () => { }
});

export const SocketProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState<any>(null); //change type
    const [isConnected, setIsConnected] = useState(false);

    const connectSocket = () => {
        const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SOCKET_URL ?? "");
        socketInstance.on("connect", () => {
            console.log("Connecting....");
            setIsConnected(true);
        });
        socketInstance.on("disconnect", () => {
            setIsConnected(false);
        });
        setSocket(socketInstance);
    };

    useEffect(() => {
        connectSocket(); // Connect socket when the component mounts
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    return (
        <SocketContext.Provider
            value={{ socket, isConnected, connectSocket }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = (): ContextType => {
    const context = useContext(SocketContext);
    if (!context)
        throw new Error(
            'Called useNotifications before setting NotificationProvider context'
        );

    return context;
};