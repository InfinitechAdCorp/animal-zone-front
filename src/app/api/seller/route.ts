import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const backend = process.env.BACKEND_URL; // ✅ use env

  try {
    const formData = await req.formData();

    const res = await fetch(`${backend}/api/seller/register`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
