import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  const res = await fetch(`${backend}/api/seller/register`, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
