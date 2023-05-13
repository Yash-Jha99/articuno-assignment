import { type Post } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { redis } from "~/server/cache";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(5),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const keys = await redis.keys("*posts*");
      if (keys?.length !== 0) await redis.DEL([...keys]);
      return await ctx.prisma.post.create({ data: { userId: id, ...input } });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(5),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const keys = await redis.keys("*posts*");
      if (keys?.length !== 0) await redis.DEL([...keys]);
      return await ctx.prisma.post.update({
        data: { ...input },
        where: { id: input.id },
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      let result;
      const { page = 1 } = input;
      const cachedResult = await redis.get(`posts[${page}]`);
      if (cachedResult) {
        result = JSON.parse(cachedResult) as { count: number; data: Post[] };
        console.log(`[Cache] : posts[${page}]`);
      } else {
        const count = await ctx.prisma.post.count();
        const data = await ctx.prisma.post.findMany({
          orderBy: { createdAt: "desc" },
          take: 10,
          skip: (page - 1) * 10,
        });
        result = { count, data };
        await redis.set(`posts[${page}]`, JSON.stringify({ count, data }));
      }
      return result;
    }),

  getAllUser: protectedProcedure
    .input(
      z.object({
        page: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = ctx.session.user;
      const count = await ctx.prisma.post.count({ where: { userId: id } });
      const data = await ctx.prisma.post.findMany({
        where: { userId: id },
        orderBy: { createdAt: "desc" },
        take: 10,
        skip: ((input.page || 1) - 1) * 10,
      });

      return { count, data };
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.post.findUnique({
        include: { user: { select: { name: true } } },
        where: { id: input.id },
      });
    }),
});
