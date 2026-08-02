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
      <body>{children}</body>
    </html>
  );
}
