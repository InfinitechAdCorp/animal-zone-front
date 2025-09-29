import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const backend = process.env.BACKEND_URL; // ✅ use env

  try {
    const res = await fetch(`${backend}/api/buyer/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
