interface ContactNotificationParams {
  id: string
  firstName: string
  lastName: string
  email: string
  message: string
  type: string
  createdAt: Date
}

export const contactSubmissionAdminNotificationTemplate = ({
  id,
  firstName,
  lastName,
  email,
  message,
  type,
  createdAt
}: ContactNotificationParams) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission - Education Comes First</title>
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #fcf7f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 48px;">
      <h1 style="margin: 0 0 8px 0; color: #000000; font-size: 32px; font-weight: 700; letter-spacing: -0.02em;">Education Comes First</h1>
      <p style="margin: 0; color: #00a2d1; font-size: 15px; font-weight: 500;">New contact submission</p>
    </div>

    <!-- Main Message -->
    <div style="margin-bottom: 40px;">
      <p style="margin: 0 0 24px 0; color: #1a1a1a; font-size: 16px; line-height: 1.6; font-weight: 500;">
        You have a new message from ${firstName} ${lastName}. Full details below.
      </p>
    </div>

    <!-- Submission Details -->
    <div style="margin-bottom: 48px; padding: 24px; background-color: #ffffff; border: 1px solid #f0e6db; border-radius: 6px;">
      <div style="margin-bottom: 16px;">
        <p style="margin: 0 0 8px 0; color: #00a2d1; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">From</p>
        <p style="margin: 0; color: #000000; font-size: 16px; font-weight: 700;">${firstName} ${lastName}</p>
      </div>
      <div style="margin-bottom: 16px; padding-top: 16px; border-top: 1px solid #f0e6db;">
        <p style="margin: 0 0 8px 0; color: #00a2d1; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
        <p style="margin: 0; color: #000000; font-size: 14px;">
          <a href="mailto:${email}" style="color: #00a2d1; text-decoration: none; font-weight: 500;">${email}</a>
        </p>
      </div>
      <div style="margin-bottom: 16px; padding-top: 16px; border-top: 1px solid #f0e6db;">
        <p style="margin: 0 0 8px 0; color: #00a2d1; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Type</p>
        <p style="margin: 0; color: #000000; font-size: 14px;">${type}</p>
      </div>
      <div style="margin-bottom: 16px; padding-top: 16px; border-top: 1px solid #f0e6db;">
        <p style="margin: 0 0 8px 0; color: #00a2d1; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Submission ID</p>
        <p style="margin: 0; color: #000000; font-size: 14px; font-family: 'SF Mono', Monaco, monospace;">${id}</p>
      </div>
      <div style="margin-bottom: 0; padding-top: 16px; border-top: 1px solid #f0e6db;">
        <p style="margin: 0 0 8px 0; color: #00a2d1; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Received</p>
        <p style="margin: 0; color: #000000; font-size: 14px;">${new Date(createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}</p>
      </div>
    </div>

    <!-- Message -->
    <div style="margin-bottom: 48px; padding: 24px; background-color: #fddd58; border-radius: 6px;">
      <p style="margin: 0 0 12px 0; color: #000000; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
      <p style="margin: 0; color: #000000; font-size: 14px; line-height: 1.8; font-weight: 500; white-space: pre-wrap;">${message}</p>
    </div>

    <!-- Reply CTA -->
    <div style="margin-bottom: 48px; text-align: center;">
      <a href="mailto:${email}?subject=Re:%20Your%20message%20to%20Education%20Comes%20First" style="display: inline-block; padding: 14px 32px; background-color: #00a2d1; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; letter-spacing: 0.3px;">
        Reply to ${firstName}
      </a>
    </div>

    <!-- Footer -->
    <div style="padding-top: 24px; border-top: 1px solid #f0e6db; text-align: center;">
      <p style="margin: 0 0 12px 0; color: #666666; font-size: 13px; line-height: 1.6;">
        Manage all submissions in the admin dashboard.
      </p>
      <p style="margin: 12px 0 0 0; color: #999999; font-size: 12px; line-height: 1.5;">
        Education Comes First<br>
        © ${new Date().getFullYear()} Education Comes First. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`
