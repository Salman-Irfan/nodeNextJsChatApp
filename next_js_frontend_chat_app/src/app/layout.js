import "./globals.css";
import Navbar from "./layouts/navbar/Navbar"

export const metadata = {
  title: 'MERN Chat App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
