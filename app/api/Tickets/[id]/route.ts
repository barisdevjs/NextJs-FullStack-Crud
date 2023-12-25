import Ticket from "@/app/(models)/Ticket";
import { ErrorResponse, GetSingleTicketResponse } from "@/libs/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<GetSingleTicketResponse | ErrorResponse>> {
  const { id } = params;
  try {
    const foundTicket = await Ticket.findOne({ _id: id });
    if (!foundTicket) {
      return NextResponse.json(
        { message: "Ticket not found" } as ErrorResponse,
        { status: 404 }
      );
    }
    return NextResponse.json(foundTicket as GetSingleTicketResponse, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: "Error", err } as ErrorResponse, {
      status: 500,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ message: string } | ErrorResponse>> {
  try {
    const { id } = params;
    const body = await req.json();
    const ticketData = body.formData;
    const foundTicket = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });

    if (!foundTicket) {
      return NextResponse.json(
        { message: "Ticket not found" } as ErrorResponse,
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ message: string } | ErrorResponse>> {
  try {
    const { id } = params;

    await Ticket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
