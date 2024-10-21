import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

import { signUpInput,signInInput } from "@omsharma_42306/medium-common-package";
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signUpInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({msg:"Incorrect Inputs!"});
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const {success} = signInInput.safeParse(body);
  if(!success){
    c.status(411);
    c.json({msg:"incorrect inputs!"});
  }
  const email = body.email;
  const password = body.password;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      c.status(403);
      return c.json({ msg: "User not found " });
    }
    if (password !== user.password) {
      c.status(401);
      return c.json({ msg: "Password is Wrong" });
    }
    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({ token });
  } catch (error) {
    return c.json({ error });
  } finally {
    await prisma.$disconnect();
  }
});
