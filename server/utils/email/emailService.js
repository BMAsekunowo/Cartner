const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// 📩 Welcome Email
const sendWelcomeEmail = async (to, name) => {
    return resend.emails.send({
      from: 'Cartner Team <welcome@cartnerhq.com>',
      to,
      subject: `🎉 Welcome to Cartner, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2 style="color: #0F172A;">Hey ${name},</h2>
          <p>We’re absolutely thrilled to welcome you to <strong>Cartner</strong> – the ultimate way to shop smarter, together.</p>
          
          <p>Whether you’re teaming up with friends, planning a shared purchase, or just looking for a better way to split carts and budgets, Cartner gives you the power to collaborate in real time with ease.</p>
  
          <p>Here’s a quick glimpse of what you can now do:</p>
          <ul>
            <li>Create or join shared shopping sessions</li>
            <li>Split items and costs with others</li>
            <li>Track changes and decisions in real-time</li>
            <li>Finalize group orders without the chaos</li>
          </ul>
  
          <p>We believe that shopping should be social, transparent, and fun. You now have the tools to make that happen — whether you're planning a group gift, a shared grocery run, or a dream vacation haul.</p>
  
          <p style="margin-top: 1.5rem;">To get started, just log in to your dashboard and create your first session. If you ever need help, our support team is just a click away.</p>
  
          <p>Thanks for being part of the Cartner revolution.<br/>We can't wait to see what you build — together.</p>
  
          <p style="margin-top: 2rem;">
            Cheers,<br>
            <strong>The Cartner Team</strong>
          </p>
        </div>
      `,
    });
  };


  // 🔐 Password Reset Email
const sendPasswordResetEmail = async (to, resetLink) => {
    return resend.emails.send({
      from: 'Cartner Authorization <auth@cartnerhq.com>',
      to,
      subject: `Reset Your Password`,
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
  };


  // 🧑‍🤝‍🧑 Session Invite
const sendSessionInviteEmail = async (to, inviterName, sessionName) => {
    return resend.emails.send({
      from: 'Cartner Sessions <notify@cartnerhq.com>',
      to,
      subject: `${inviterName} invited you to join a Cartner shopping session`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2 style="color: #0F172A;">You're Invited to Collaborate!</h2>
          
          <p><strong>${inviterName}</strong> just invited you to join a shared Cartner session titled:</p>
          <p style="font-size: 1.2rem; color: #0f172a;"><strong>🛒 ${sessionName}</strong></p>
          
          <p>This means you can now:</p>
          <ul>
            <li>View, add, and manage products in real-time</li>
            <li>Chat, coordinate, and make group decisions</li>
            <li>Split costs fairly and track everyone's contributions</li>
            <li>Collaborate on a joint purchase without stress</li>
          </ul>
  
          <p>Whether you're planning a group gift, organizing groceries with roommates, or managing a collective order, Cartner makes it seamless and transparent.</p>
  
          <p style="margin-top: 1rem;">Don't keep your shopping partner waiting! Click the button below to jump into the session:</p>
  
          <p style="text-align: center; margin: 2rem 0;">
            <a href="#" style="background-color: #1f2937; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Join ${sessionName}
            </a>
          </p>
  
          <p>If you're new to Cartner, you'll be prompted to create an account or log in before accessing the session.</p>
  
          <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />
  
          <p style="font-size: 0.9rem; color: #6b7280;">
            This invite was sent by ${inviterName} using Cartner's collaborative shopping platform.
            If you have any questions or didn't expect this email, you can safely ignore it or <a href="mailto:support@cartnerhq.com">contact support</a>.
          </p>
  
          <p style="margin-top: 1.5rem;">See you in the session!</p>
  
          <p>
            Best,<br>
            <strong>The Cartner Team</strong>
          </p>
        </div>
      `,
    });
  };

  // 📦 Order Confirmation
const sendOrderConfirmationEmail = async (to, orderDetailsHtml) => {
  return resend.emails.send({
    from: 'Cartner Orders <orders@cartnerhq.com>',
    to,
    subject: `🛍️ Your Cartner Order Confirmation`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #0F172A;">Thank you for your order with Cartner!</h2>

        <p>We've received your order and are already preparing it for processing. Below is a summary of your order details.</p>

        <p style="margin-top: 1.5rem;"><strong>🧾 Order Summary:</strong></p>
        <div style="margin: 1rem 0; padding: 1rem; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
          ${orderDetailsHtml}
        </div>

        <p>If this order was part of a collaborative session, all participants will receive their individual confirmations as well.</p>

        <p style="margin-top: 1rem;">You can always track, revisit, or reorder from your Cartner dashboard anytime.</p>

        <p style="margin-top: 2rem; text-align: center;">
          <a href="https://cartnerhq.com/orders" style="background-color: #1f2937; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            View My Order
          </a>
        </p>

        <p style="margin-top: 2rem;">If you have any questions about your order or need assistance, please don’t hesitate to <a href="mailto:support@cartnerhq.com">contact our support team</a>.</p>

        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 0.9rem; color: #6b7280;">
          This is an automated confirmation sent by Cartner. If you did not place this order or believe this was sent in error, please contact us immediately at
          <a href="mailto:support@cartnerhq.com">support@cartnerhq.com</a>.
        </p>

        <p style="margin-top: 1.5rem;">
          Thanks for shopping smarter,<br />
          <strong>The Cartner Team</strong>
        </p>
      </div>
    `,
  });
};


module.exports = {
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendSessionInviteEmail,
    sendOrderConfirmationEmail,
};