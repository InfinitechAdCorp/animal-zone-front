import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") || "all";

  // get token from cookies or localStorage (server side mas ok via cookies)
  const token = req.cookies.get("authToken")?.value || "";

  const res = await fetch(`${BACKEND_URL}/api/sellers?status=${status}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
