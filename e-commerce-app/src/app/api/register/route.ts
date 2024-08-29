import { z } from "zod";
import { addUser, userUniqueValidation } from "@/db/models/user";

export async function GET(req: Request) {
  return Response.json("hello");
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const parsedData = z
      .object({
        name: z.string().optional(),
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
      .safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }
    await userUniqueValidation(parsedData.data.email, parsedData.data.username);
    await addUser(parsedData.data);
    return (
      Response.json({
        message: `Successfully created user ${parsedData.data.username}`,
        statusCode: 201,
      }),
      {
        status: 201,
      }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.issues[0].path[0], err.issues[0].message, "<< ERR DI SERVER");
      return Response.json(
        {
          message: `${err.issues[0].path[0]} ${err.issues[0].message} `,
          statusCode: 404,
        },
        {
          status: 404,
        }
      );
    }
    if (err instanceof Error) {
      if ((err.cause = "USERNAME_UNIQUE_CONSTRAINT")) {
        return Response.json(
          {
            message: err.message,
            statusCode: 404,
          },
          {
            status: 404,
          }
        );
      } else if ((err.cause = "USERNAME_UNIQUE_CONSTRAINT")) {
        return Response.json(
          {
            message: err.message,
            statusCode: 404,
          },
          {
            status: 404,
          }
        );
      }
    }
    return Response.json(
      {
        message: "Internal Server Error",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
