import { Poppins } from "next/font/google";
import React, { ReactNode } from "react";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin-ext"],
});

import "../../globalsLanding.css";

export default function AuthRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
