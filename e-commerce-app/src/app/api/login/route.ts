import { signToken } from "@/db/helpers/jwt";
import { login } from "@/db/models/user";
import { createCookie } from "@/lib/actions";
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

    createCookie(access_token);
    return Response.json({ access_token, statusCode: 200 }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
