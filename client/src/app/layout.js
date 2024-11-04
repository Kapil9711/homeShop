import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "HomeShop",
  description:
    "Shop the latest in fashion, electronics, home decor, and more at HomeShop.com. Discover a wide range of top-quality products at unbeatable prices, with fast shipping and excellent customer service. Browse our categories for deals on clothing, tech gadgets, beauty products, and essentials for every lifestyle. Enjoy a seamless, secure shopping experience today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
