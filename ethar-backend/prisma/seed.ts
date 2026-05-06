import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Admin Team
  const team = await prisma.team.upsert({
    where: { id: "default-team-id" },
    update: {},
    create: {
      id: "default-team-id",
      name: "Ethar.ai Team",
    },
  });

  // Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@ethar.ai" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@ethar.ai",
      password: adminPassword,
      role: "ADMIN",
      teamId: team.id,
    },
  });

  // Create Member User
  const memberPassword = await bcrypt.hash("member123", 10);
  const member = await prisma.user.upsert({
    where: { email: "member@ethar.ai" },
    update: {},
    create: {
      name: "Test Member",
      email: "member@ethar.ai",
      password: memberPassword,
      role: "MEMBER",
      teamId: team.id,
    },
  });

  // Create a sample project
  const project = await prisma.project.upsert({
    where: { id: "sample-project-id" },
    update: {},
    create: {
      id: "sample-project-id",
      name: "Website Redesign",
      description: "Redesign the company website with modern UI",
      teamId: team.id,
    },
  });

  // Create sample tasks
  await prisma.task.upsert({
    where: { id: "task-1" },
    update: {},
    create: {
      id: "task-1",
      title: "Design new homepage",
      description: "Create wireframes and mockups for the new homepage",
      status: "IN_PROGRESS",
      projectId: project.id,
      assigneeId: member.id,
    },
  });

  await prisma.task.upsert({
    where: { id: "task-2" },
    update: {},
    create: {
      id: "task-2",
      title: "Set up CI/CD pipeline",
      description: "Configure GitHub Actions for automated deployment",
      status: "TODO",
      projectId: project.id,
      assigneeId: admin.id,
    },
  });

  await prisma.task.upsert({
    where: { id: "task-3" },
    update: {},
    create: {
      id: "task-3",
      title: "Write API documentation",
      description: "Document all REST API endpoints with examples",
      status: "REVIEW",
      projectId: project.id,
      assigneeId: member.id,
    },
  });

  await prisma.task.upsert({
    where: { id: "task-4" },
    update: {},
    create: {
      id: "task-4",
      title: "Setup authentication",
      description: "Implement JWT-based auth flow",
      status: "DONE",
      projectId: project.id,
      assigneeId: admin.id,
    },
  });

  console.log("✅ Seed complete!");
  console.log("");
  console.log("🔑 Login Credentials:");
  console.log("   Admin  → email: admin@ethar.ai  | password: admin123");
  console.log("   Member → email: member@ethar.ai | password: member123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
