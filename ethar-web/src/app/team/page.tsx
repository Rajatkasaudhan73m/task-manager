import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import styles from "../dashboard.module.css";
import Link from "next/link";

async function fetchTeam(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    return res.ok ? await res.json() : [];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function TeamPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if ((session.user as any)?.role !== "ADMIN") {
    return (
      <AppLayout>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          You do not have permission to view this page. Admin access required.
        </div>
      </AppLayout>
    );
  }

  const token = (session.user as any).backendToken;
  const teamMembers = await fetchTeam(token);

  return (
    <AppLayout>
      <header className={styles.header}>
        <h1>My Team</h1>
        <div className={styles.headerActions}>
          <button className="btn-primary">+ Invite Member</button>
        </div>
      </header>

      <div
        className="glass fade-in"
        style={{ marginTop: "2rem", borderRadius: "12px", overflow: "hidden" }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderBottom: "1px solid var(--surface-border)",
              }}
            >
              <th style={{ padding: "1rem", fontWeight: "500", color: "var(--text-muted)" }}>
                Name
              </th>
              <th style={{ padding: "1rem", fontWeight: "500", color: "var(--text-muted)" }}>
                Email
              </th>
              <th style={{ padding: "1rem", fontWeight: "500", color: "var(--text-muted)" }}>
                Role
              </th>
              <th
                style={{
                  padding: "1rem",
                  fontWeight: "500",
                  color: "var(--text-muted)",
                  textAlign: "right",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member: any) => (
              <tr key={member.id} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {member.name?.charAt(0)}
                    </div>
                    {member.name}
                  </div>
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>{member.email}</td>
                <td style={{ padding: "1rem" }}>
                  <span
                    style={{
                      background:
                        member.role === "ADMIN"
                          ? "rgba(99, 102, 241, 0.2)"
                          : "rgba(255, 255, 255, 0.1)",
                      color: member.role === "ADMIN" ? "var(--primary)" : "var(--text-muted)",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {member.role}
                  </span>
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <button
                    style={{ color: "var(--danger)", background: "none", fontSize: "0.85rem" }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {teamMembers.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}
                >
                  No team members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
