import type { Metadata } from "next";
import { SocketProvider } from "../provider/socket";

export const metadata: Metadata = {
    title: "Live Stream",
    description: "Live Chat by Socket.io",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SocketProvider>
            {children}
        </SocketProvider>
    );
}
