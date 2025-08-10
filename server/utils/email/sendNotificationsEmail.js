const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

// Session Creation Notification
const sendSessionCreationEmail = async (
  to,
  creatorName,
  sessionName,
  sessionCode,
) => {
  return resend.emails.send({
    from: "Cartner Sessions <notify@cartnerhq.shop>",
    to,
    subject: `🎉 Your Cartner session "${sessionName}" is live!`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #0F172A;">You've successfully created a Cartner session</h2>

        <p>Hi <strong>${creatorName}</strong>,</p>
        
        <p>Your session "<strong>${sessionName}</strong>" is now active and ready to go!</p>

        <p>Here’s your Session Code: "<strong>${sessionCode}</strong>"</p>
        
        <p>You can now:</p>
        <ul>
          <li>Start adding products to your cart</li>
          <li>Invite participants to collaborate in real-time</li>
          <li>Track everyone’s contributions and chat live</li>
          <li>Split total cost and finalize the order effortlessly</li>
        </ul>

        <p style="margin-top: 1rem;">Ready to get started?</p>

        <p style="text-align: center; margin: 2rem 0;">
          <a href="https://cartnerhq.shop/sessions" style="background-color: #1f2937; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Open Session
          </a>
        </p>

        <p style="font-size: 0.95rem; color: #4b5563;">
          Your collaborative shopping just got easier. Happy Cartning!
        </p>

        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 0.85rem; color: #6b7280;">
          This email was sent to notify you of your new Cartner session creation.
          If you did not initiate this or need help, please <a href="mailto:support@cartnerhq.shop">contact support</a>.
        </p>

        <p style="margin-top: 1.5rem;">Best,<br><strong>The Cartner Team</strong></p>
      </div>
    `,
  });
};

// 🧑‍🤝‍🧑 Session Invite
const sendSessionInviteEmail = async (to, inviterName, sessionName) => {
  return resend.emails.send({
    from: "Cartner Sessions <notify@cartnerhq.shop>",
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
              If you have any questions or didn't expect this email, you can safely ignore it or <a href="mailto:support@cartnerhq.shop">contact support</a>.
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

// Session Invite Accepted Notification
const sendAcceptInviteEmail = async (to, sessionName, accepterName) => {
  return resend.emails.send({
    from: "Cartner Sessions <notify@cartnerhq.shop>",
    to,
    subject: `${accepterName} accepted your invite to ${sessionName}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #0F172A;">Invite Accepted</h2>
        <p><strong>${accepterName}</strong> has accepted your invitation to the session:</p>
        <p style="font-size: 1.2rem;"><strong>🛒 ${sessionName}</strong></p>
        <p>You can now collaborate together on your Cartner session.</p>
        <p style="margin-top: 1rem;">Visit your session dashboard to continue planning together.</p>
        <p>
          <a href="#" style="background-color: #1f2937; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
            Go to Session
          </a>
        </p>
        <p style="font-size: 0.9rem; color: #6b7280;">Cartner | Transparent group shopping made easy.</p>
      </div>
    `,
  });
};

// Session Invite Rejected Notification
const sendRejectInviteEmail = async (to, sessionName, rejecterName) => {
  return resend.emails.send({
    from: "Cartner Sessions <notify@cartnerhq.shop>",
    to,
    subject: `${rejecterName} declined your Cartner session invite`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #DC2626;">Invite Declined</h2>
        <p><strong>${rejecterName}</strong> has declined your invitation to the session:</p>
        <p style="font-size: 1.2rem;"><strong>🛒 ${sessionName}</strong></p>
        <p>You can invite someone else or continue the session with other participants.</p>
        <p style="font-size: 0.9rem; color: #6b7280;">This is a courtesy notification from Cartner.</p>
      </div>
    `,
  });
};

// User Left Session Notification
const sendLeaveSessionEmail = async (to, leaverName, sessionName) => {
  return resend.emails.send({
    from: "Cartner Sessions <notify@cartnerhq.shop>",
    to,
    subject: `${leaverName} has left your Cartner session "${sessionName}"`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #0F172A;">Participant Left Your Session</h2>

        <p>Hi there,</p>
        
        <p><strong>${leaverName}</strong> has just exited the session titled <strong>${sessionName}</strong>.</p>

        <p>This means they will no longer be able to:</p>
        <ul>
          <li>View or modify the cart</li>
          <li>Join future updates or decisions</li>
          <li>Contribute to shared purchases within this session</li>
        </ul>

        <p>If this was unexpected or you’d like to re-invite them, simply head to your session panel and send a new invite.</p>

        <p style="text-align: center; margin: 2rem 0;">
          <a href="https://cartnerhq.shop/sessions" style="background-color: #1f2937; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Manage My Sessions
          </a>
        </p>

        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 0.85rem; color: #6b7280;">
          You received this notification because you're a participant or creator of the session "<strong>${sessionName}</strong>" on Cartner.
          If you need help, please <a href="mailto:support@cartnerhq.shop">contact support</a>.
        </p>

        <p style="margin-top: 1.5rem;">Best regards,<br><strong>The Cartner Team</strong></p>
      </div>
    `,
  });
};

// Session Ended Notification
const sendSessionEndedEmail = async (to, sessionName) => {
  return resend.emails.send({
    from: "Cartner Notifications <notify@cartnerhq.shop>",
    to,
    subject: `Session "${sessionName}" has ended`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #B91C1C;">Session Ended</h2>
        <p>The session <strong>${sessionName}</strong> you were part of has now ended.</p>

        <p>What this means:</p>
        <ul>
          <li>No further edits can be made to this session or its cart.</li>
          <li>You can still view your cart history and order summary.</li>
        </ul>

        <p style="margin-top: 1rem;">Thanks for collaborating on Cartner!</p>

        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size: 0.9rem; color: #6b7280;">
          If you have any questions, reach out at <a href="mailto:support@cartnerhq.shop">support@cartnerhq.shop</a>.
        </p>

        <p><strong>The Cartner Team</strong></p>
      </div>
    `,
  });
};

// Session Join Request
const sendSessionJoinRequestEmail = async (to, requesterName, sessionName) => {
  return resend.emails.send({
    from: "Cartner Alerts <notify@cartnerhq.shop>",
    to,
    subject: `${requesterName} requested to join "${sessionName}"`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #0F766E;">Join Request Received</h2>
        <p><strong>${requesterName}</strong> just requested access to the Cartner session:</p>
        <p style="font-size: 1.2rem; color: #0f172a;"><strong>${sessionName}</strong></p>

        <p>You can approve or ignore this request from your Cartner dashboard.</p>

        <p style="text-align: center; margin: 2rem 0;">
          <a href="#" style="background-color: #0f766e; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Review Request
          </a>
        </p>

        <p>If you don’t recognize this user, you can simply ignore this email.</p>

        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size: 0.9rem; color: #6b7280;">
          This alert was sent by Cartner. For help, email <a href="mailto:support@cartnerhshop">support@cartnerhq.shop</a>.
        </p>
        <p><strong>The Cartner Team</strong></p>
      </div>
    `,
  });
};

// Session Join Request Rejected
const sendRejectJoinReqEmail = async (to, sessionName, ownerName) => {
  return resend.emails.send({
    from: "Cartner Sessions <notify@cartnerhq.shop>",
    to,
    subject: `Your join request to ${sessionName} was declined`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #DC2626;">Join Request Declined</h2>
        <p>Your request to join the Cartner session:</p>
        <p style="font-size: 1.2rem;"><strong>🛒 ${sessionName}</strong></p>
        <p>was declined by <strong>${ownerName}</strong>.</p>
        <p>We encourage you to explore or create your own collaborative shopping session anytime.</p>
        <p style="margin-top: 1rem;">
          <a href="#" style="background-color: #1f2937; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
            Start New Session
          </a>
        </p>
        <p style="font-size: 0.9rem; color: #6b7280;">You're always welcome on Cartner 💙</p>
      </div>
    `,
  });
};

// Session Join Request Approved
const sendJoinReqApprovedEmail = async (to, approverName, sessionName) => {
  return resend.emails.send({
    from: "Cartner Notifications <notify@cartnerhq.shop>",
    to,
    subject: `You've been approved to join "${sessionName}" on Cartner!`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #15803D;">Access Granted 🎉</h2>
        <p>Hi there!</p>

        <p><strong>${approverName}</strong> has approved your request to join the Cartner session:</p>
        <p style="font-size: 1.2rem; color: #0f172a;"><strong>${sessionName}</strong></p>

        <p>You can now:</p>
        <ul>
          <li>View and add products in real-time</li>
          <li>Collaborate with other members</li>
          <li>Split expenses and manage orders together</li>
        </ul>

        <p style="margin-top: 1rem;">Click below to jump into the session and start shopping:</p>

        <p style="text-align: center; margin: 2rem 0;">
          <a href="#" style="background-color: #15803D; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Access ${sessionName}
          </a>
        </p>

        <p>See you in the cart 🛒</p>

        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size: 0.9rem; color: #6b7280;">
          This notification was sent by Cartner. For support, email <a href="mailto:support@cartnerhq.shop">support@cartnerhq.shop</a>.
        </p>
        <p><strong>The Cartner Team</strong></p>
      </div>
    `,
  });
};

// Notify user of profile update
const sendProfileUpdatedEmail = async (to, name) => {
  return resend.emails.send({
    from: "Cartner Security <notify@cartnerhq.shop>",
    to,
    subject: `📝 Your Cartner profile was updated`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="color: #0F172A;">Hi ${name},</h2>
        
        <p>This is a quick confirmation that your <strong>Cartner profile</strong> has been updated successfully.</p>
        
        <p>If you made this change, no further action is required.</p>
        <p>If you did <strong>not</strong> update your profile, please log in and review your account activity immediately.</p>
        
        <p style="margin-top: 2rem;">Stay safe,</p>
        <p><strong>The Cartner Security Team</strong></p>

        <hr style="margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size: 0.9rem; color: #6b7280;">
          If you have questions, contact <a href="mailto:support@cartnerhshop">support@cartnerhq.shop</a>.
        </p>
      </div>
    `,
  });
};

module.exports = {
  sendSessionCreationEmail,
  sendSessionInviteEmail,
  sendAcceptInviteEmail,
  sendRejectInviteEmail,
  sendSessionEndedEmail,
  sendSessionJoinRequestEmail,
  sendRejectJoinReqEmail,
  sendJoinReqApprovedEmail,
  sendProfileUpdatedEmail,
};
