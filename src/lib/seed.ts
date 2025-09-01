import { db } from "@/lib/db"

async function main() {
  const demoUser = await db.user.create({
    data: {
      email: "demo@example.com",
      name: "Demo User",
      password: "password123",
    },
  })

  console.log("Demo user created:", demoUser)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })