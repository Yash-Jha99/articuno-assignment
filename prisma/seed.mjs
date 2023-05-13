import { PrismaClient } from "@prisma/client"
import data from "./posts.json" assert { type: "json" }
import users from "./users.json" assert { type: "json" }

const prisma = new PrismaClient()
const posts = data.map(item => ({ id: item.id.toString(), userId: item.userId.toString(), title: item.title, content: item.body }))

const main = async () => {
    const createUsers = await prisma.user.createMany({ data: users })
    const createPosts = await prisma.post.createMany({ data: posts })
    console.log(createPosts, createUsers)
}

main().then(() => console.log("Db seeded")).catch((err) => console.log(err))