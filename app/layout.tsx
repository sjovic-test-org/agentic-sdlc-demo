import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TaskPulse",
  description: "A minimal task management demo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
