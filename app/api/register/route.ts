import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const res = await request.json();

  const data = await prisma.user.create({
    data: {
      email: res.email,
    },
  });

  return Response.json({ data });
}
