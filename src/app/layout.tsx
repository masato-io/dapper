import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dapper Pack Scene",
  description: "Interactive 3D pack visualization with dynamic effects",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 70%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10" style={{ viewTransitionName: "root" }}>
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
