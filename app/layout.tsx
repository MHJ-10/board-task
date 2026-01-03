import type { Metadata } from "next";
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: "Board Task",
  description: "board task project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
