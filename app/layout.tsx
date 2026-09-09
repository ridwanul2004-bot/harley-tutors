import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harley Tutors | Personalised Maths, English & Science Tuition",
  description:
    "Personalised online tutoring in Maths, English and Science from primary school to A-Level. Clear teaching, stronger confidence and better results.",
  keywords: [
    "online tutor",
    "GCSE maths tutor",
    "English tutor",
    "science tutor",
    "A-Level maths tutor",
    "Harley Tutors"
  ],
  openGraph: {
    title: "Harley Tutors",
    description: "Making difficult subjects make sense.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
