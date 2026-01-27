import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === "admin" && password === "1234") {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
