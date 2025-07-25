const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// 🔐 Password Reset Email
const sendPasswordResetEmail = async (to, resetLink) => {
  return resend.emails.send({
    from: "Cartner Authorization <auth@cartnerhq.com>",
    to,
    subject: `Reset Your Password`,
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

module.exports = {
  sendPasswordResetEmail,
};
