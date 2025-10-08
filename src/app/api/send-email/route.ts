import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json()

  try {
    await resend.emails.send({
      from: `${name} <onboarding@resend.dev>`,
      to: 'animalzoneph@gmail.com',
      subject,
      html: `<p><b>From:</b> ${name} (${email})</p><p>${message}</p>`,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
