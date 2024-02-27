import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { IUser } from "@/types/generalTypes";
import User from "@/app/(models)/User";

type PostResponseBody = Record<string, string | unknown>;

export async function POST(
  req: NextRequest
): Promise<NextResponse<PostResponseBody>> {
  try {
    const body = await req.json();
    const { email, password, name, id } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userData: IUser = {
      email,
      name,
      id,
      password: hashPassword,
    };

    await User.create(userData);
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
