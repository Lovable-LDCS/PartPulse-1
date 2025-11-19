import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { PreviewProvider } from "@/contexts/PreviewContext";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "PartPulse - Spare Parts Distribution Management",
  description: "Internal spare parts distribution management system for Trane Thermo King",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RoleProvider>
            <PreviewProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </PreviewProvider>
          </RoleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
