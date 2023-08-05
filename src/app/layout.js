import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import Footer from "@/components/footer/Footer";
import AuthProvider from "@/components/authprovider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "BLOGiT",
    description: "Welcome to my blogging platform",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider>
                    <AuthProvider>
                        <div className="container">
                            <Navbar />
                            {children}
                        </div>
                    </AuthProvider>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
