import Ticket from "@/app/(models)/Ticket";
import { ErrorResponse, GetResponse } from "@/libs/utils";
import { TMongoTicket } from "@/types/generalTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(): Promise<
  NextResponse<GetResponse | ErrorResponse>
> {
  try {
    const tickets = await Ticket.find();
    return NextResponse.json({ tickets } as GetResponse, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err } as ErrorResponse, {
      status: 500,
    });
  }
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<{ message: string } | ErrorResponse>> {
  try {
    const body = await req.json();
    const ticketData = body.formData;
    await Ticket.create(ticketData);

    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err } as ErrorResponse, {
      status: 500,
    });
  }
}
