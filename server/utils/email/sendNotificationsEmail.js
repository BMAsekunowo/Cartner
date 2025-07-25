const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// 🧑‍🤝‍🧑 Session Invite
const sendSessionInviteEmail = async (to, inviterName, sessionName) => {
  return resend.emails.send({
    from: "Cartner Sessions <notify@cartnerhq.com>",
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

module.exports = {
  sendSessionInviteEmail,
};
