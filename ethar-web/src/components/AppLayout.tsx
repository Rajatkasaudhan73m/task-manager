"use client";

import React from "react";
import Sidebar from "./Sidebar";
import styles from "../app/dashboard.module.css";
import { useSession } from "next-auth/react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div
        style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
