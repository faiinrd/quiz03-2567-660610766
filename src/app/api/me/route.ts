import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Noprada Kritwattananont",
    studentId: "660610766",
  });
};
