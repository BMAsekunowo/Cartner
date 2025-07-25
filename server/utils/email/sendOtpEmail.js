const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Main dynamic OTP email sender
const sendOTPEmail = async (to, name, otp, purpose = "login") => {
  let subject = "";
  let action = "";

  switch (purpose) {
    case "register":
      subject = `🔐 Your Cartner Registration Code`;
      action = "complete your registration";
      break;
    case "login":
      subject = `🔐 Your Cartner Login Code`;
      action = "log in to your account";
      break;
    case "updateCredentials":
      subject = `🔐 Your Cartner Account Update Code`;
      action = "confirm your account changes";
      break;
    default:
      subject = `🔐 Your Cartner Verification Code`;
      action = "continue securely";
  }

  return resend.emails.send({
    from: "Cartner Security <auth@cartnerhq.shop>",
    to,
    subject,
    html: `
      <div style="font-family: 'DM Sans', sans-serif; line-height: 1.6;">
        <h2 style="color: #0f172a;">Hello ${name},</h2>
        <p>Here is your one-time verification code to ${action}:</p>
        <h1 style="letter-spacing: 4px; font-size: 2em; background: #f3f4f6; display: inline-block; padding: 0.5em 1em; border-radius: 8px;">
          ${otp}
        </h1>
        <p>This code is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
        <p>If you didn’t initiate this request, you can safely ignore this email.</p>
        <br/>
        <p style="color: #6b7280;">— The Cartner Security Team</p>
      </div>
    `,
  });
};

module.exports = {
  sendOTPEmail,
};
