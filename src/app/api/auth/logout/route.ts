import { NextResponse } from "next/server";

export async function POST() {
  // Clear authentication tokens/session
  const response = NextResponse.json(
    { success: true, message: "Logged out successfully" },
    { status: 200 }
  );

  // Clear auth cookie (if you're using cookies for authentication)
  response.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });

  return response;
}
