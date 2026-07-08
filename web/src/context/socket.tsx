import React, { useContext, createContext } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);
const SOCKET_URL = import.meta.env.VITE_API_URL;

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {

    const socket = io(SOCKET_URL);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error('useSocker must be used within a SocketProvider')
    }
    return context
}
