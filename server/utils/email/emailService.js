const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// 📩 Welcome Email
const sendWelcomeEmail = async (to, name) => {
  return resend.emails.send({
    from: "Cartner Team <onboarding@cartnerhq.shop>",
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

// 📦 Order Confirmation
const sendOrderConfirmationEmail = async (to, orderDetailsHtml) => {
  return resend.emails.send({
    from: "Cartner Orders <orders@cartnerhq.shop>",
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
          <a href="https://cartnerhq.shop/orders" style="background-color: #1f2937; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            View My Order
          </a>
        </p>

        <p style="margin-top: 2rem;">If you have any questions about your order or need assistance, please don’t hesitate to <a href="mailto:support@cartnerhq.shop">contact our support team</a>.</p>

        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 0.9rem; color: #6b7280;">
          This is an automated confirmation sent by Cartner. If you did not place this order or believe this was sent in error, please contact us immediately at
          <a href="mailto:support@cartnerhq.shop">support@cartnerhq.shop</a>.
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
  sendOrderConfirmationEmail,
};
