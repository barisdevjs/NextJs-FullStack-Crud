import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { IUser } from "@/types/generalTypes";
import User from "@/app/(models)/User";

interface PostRequestBody {
  formData: IUser;
}

type PostResponseBody = Record<string, string | unknown>;

export async function POST(
  req: NextRequest
): Promise<NextResponse<PostResponseBody>> {
  try {
    console.log("XXXXXXX");
    console.log(req.body);
    console.log("ZZZZZZZ");

    const body = await req.json();
    const userData: IUser = body.formData;

    if (!userData.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // check for duplicate emails
    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);
    return NextResponse.json({ message: "User Created." }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
