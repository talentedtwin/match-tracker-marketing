import { NextResponse } from "next/server";
import formData from "form-data";
import Mailgun from "mailgun.js";

export async function POST(request: Request) {
  try {
    const { name, email, role, otherRole } = await request.json();

    const mailgunApiKey = process.env.MAILGUN_API_KEY;
    const mailgunDomain = process.env.MAILGUN_DOMAIN;
    const fromEmail = process.env.MAILGUN_FROM_EMAIL;

    if (!mailgunApiKey || !mailgunDomain || !fromEmail) {
      console.error("Mailgun configuration missing");
      return NextResponse.json(
        { success: false, error: "Email configuration error" },
        { status: 500 }
      );
    }

    const roleText = role === "Other" ? `${role} (${otherRole})` : role;

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: mailgunApiKey,
      url: "https://api.eu.mailgun.net",
    });

    await mg.messages.create(mailgunDomain, {
      from: fromEmail,
      to: ["info@matchtracker.co.uk"],
      subject: "New Waitlist Signup - MatchTracker",
      text: `A new user has signed up for the MatchTracker waitlist!\n\nDetails:\nName: ${name}\nEmail: ${email}\nRole: ${roleText}\n\nSent from: MatchTracker Marketing Website`,
      html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #2563eb;">New Waitlist Signup</h2>
          <p>A new user has signed up for the MatchTracker waitlist!</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">User Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Role:</strong> ${roleText}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Sent from: MatchTracker Marketing Website
          </p>
        </body>
      </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email notification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification email" },
      { status: 500 }
    );
  }
}
