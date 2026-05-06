"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import styles from "../app/dashboard.module.css";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className={`${styles.sidebar} glass`}>
      <div className={styles.brand}>
        <div className={styles.logo}></div>
        <h2>Ethar.ai</h2>
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}>
          Dashboard
        </Link>
        <Link
          href="/projects"
          className={`${styles.navItem} ${pathname.startsWith("/projects") ? styles.active : ""}`}
        >
          Projects
        </Link>
        <Link
          href="/tasks"
          className={`${styles.navItem} ${pathname.startsWith("/tasks") ? styles.active : ""}`}
        >
          My Tasks
        </Link>
        {(session?.user as any)?.role === "ADMIN" && (
          <Link
            href="/team"
            className={`${styles.navItem} ${pathname.startsWith("/team") ? styles.active : ""}`}
          >
            Team
          </Link>
        )}
      </nav>
      <div
        className={styles.userProfile}
        style={{ marginTop: "auto", cursor: "pointer" }}
        onClick={() => signOut()}
      >
        <div className={styles.avatar}>{session?.user?.name?.charAt(0) || "U"}</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{session?.user?.name || "User"}</span>
          <span className={styles.userRole}>{(session?.user as any)?.role || "MEMBER"}</span>
        </div>
        <div
          style={{
            marginLeft: "auto",
            color: "var(--danger)",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          Logout
        </div>
      </div>
    </aside>
  );
}
