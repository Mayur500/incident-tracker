const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedDatabase() {
  const services = ["Payments", "Auth", "Search", "Notifications"];
  const severities = ["SEV1", "SEV2", "SEV3", "SEV4"];
  const statuses = ["OPEN", "MITIGATED", "RESOLVED"];

  const incidents = [];

  for (let i = 1; i <= 200; i++) {
    incidents.push({
      title: "Incident " + i,
      service: services[i % services.length],
      severity: severities[i % severities.length],
      status: statuses[i % statuses.length],
      summary: "Sample incident created for testing purposes",
    });
  }

  await prisma.incident.createMany({
    data: incidents,
  });
}

seedDatabase()
  .then(() => {
    console.log("Database seeded successfully");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
