import { signToken } from "@/db/helpers/jwt";
import { login } from "@/db/models/user";
import { cookies } from "next/headers";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const parsedData = z
      .object({
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }
    const loggedUser = await login(parsedData.data);

    const access_token = signToken(loggedUser);

    cookies().set("Authorization", "Bearer " + access_token);
    return Response.json({ access_token, statusCode: 200 }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json(
        {
          message: `${err.issues[0].path[0]} ${err.issues[0].message} `,
          statusCode: 400,
        },
        {
          status: 400,
        }
      );
    }
    if (err instanceof Error) {
      return Response.json({ message: err.message, cause: err.cause }, { status: 400 });
    }
    return Response.json({ message: "Internal Server Error", statusCode: 500 }, { status: 500 });
  }
}
