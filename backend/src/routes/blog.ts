import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {
  createBlogInput,
  updateBlogInput,
} from "@omsharma_42306/medium-common-package";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const userId = (await verify(authHeader, c.env.JWT_SECRET)) as {
    userId: string;
  };

  if (userId) {
    c.set("userId", userId.userId);
    console.log("i am going to call next");
    console.log(userId.userId);

    await next();
    console.log("i af next");
  } else {
    c.status(403);
    return c.json({ message: "unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const authorId = c.get("userId");
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: "incorrect input!" });
  }
  console.log(body.title);
  console.log(body.content);
  console.log(authorId);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({ id: blog.id });
  } catch (err) {
    console.log("error aaaguaa");
    return c.json({ msg: err });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ msg: "incorrect Inputs!" });
  }
  try {
    const updateBlog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: updateBlog.id });
  } catch (err) {
    return c.json({ err });
  }
});

// add Pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const allBlogs = await prisma.post.findMany({
      select:{
        id:true,
        title:true,
        content:true,
        published:true,
        author:{
          select:{
            name:true
          }
        }
        
        
        
      }
    });
    return c.json({ allBlogs });
  } catch (err) {
    return c.json({ err });
  }
});

//GET requests are expected to be idempotent and not have a body
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  try {
    const blogBasedOnId = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select:{
        id:true,
        title:true,
        content:true,
        published:true,
        author:{
          select:{
            name:true
          }
        }
        
        
        
      }
    });
    if(!blogBasedOnId){
        return c.json({msg:"blog not found!"})
    }
    console.log(blogBasedOnId)
    return c.json({blog : blogBasedOnId });
  } catch (err) {
    return c.json({
      err,
    });
  }
});




