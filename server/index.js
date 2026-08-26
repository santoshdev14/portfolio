require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

const PORT = process.env.PORT || 5001;

// --------------------------------------------------
// CORS
// --------------------------------------------------

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://santoshvarma.vercel.app',

  // Your Vercel frontend
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin (Postman, server-to-server, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

// --------------------------------------------------
// Health Check
// --------------------------------------------------

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date(),
  });
});

// --------------------------------------------------
// Contact Form
// --------------------------------------------------

app.post('/api/contact', async (req, res) => {
  const {
    name,
    email,
    projectType,
    budget,
    message,
  } = req.body;

  // Validation
  if (!name || !name.trim()) {
    return res.status(400).json({
      error: 'Name is required.',
    });
  }

  if (
    !email ||
    !email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({
      error: 'A valid email is required.',
    });
  }

  if (!projectType) {
    return res.status(400).json({
      error: 'Project type is required.',
    });
  }

  if (!message || !message.trim()) {
    return res.status(400).json({
      error: 'Message description is required.',
    });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.RECEIVER_EMAIL || 'hello@santoshvarma.dev',

    replyTo: email,

    subject: `New Project Inquiry: ${projectType} from ${name}`,

    text: `
Name: ${name}
Email: ${email}
Project Type: ${projectType}
Budget: ${budget || 'Not specified'}

Message:
${message}
    `,

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 24px; text-align: center; color: white;">
          <h2 style="margin: 0; font-size: 24px;">
            New Project Inquiry
          </h2>

          <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">
            Inquiry sent from Portfolio Contact Form
          </p>
        </div>

        <div style="padding: 24px;">

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">

            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; width: 30%; color: #666;">
                Name
              </td>
              <td style="padding: 10px 0; color: #111;">
                ${name}
              </td>
            </tr>

            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #666;">
                Email
              </td>

              <td style="padding: 10px 0; color: #111;">
                <a
                  href="mailto:${email}"
                  style="color: #3b82f6; text-decoration: none;"
                >
                  ${email}
                </a>
              </td>
            </tr>

            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #666;">
                Project Type
              </td>

              <td style="padding: 10px 0; color: #111;">
                ${projectType}
              </td>
            </tr>

            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 0; font-weight: bold; color: #666;">
                Budget
              </td>

              <td style="padding: 10px 0; color: #111;">
                ${budget || 'Not specified'}
              </td>
            </tr>

          </table>

          <h3
            style="
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 8px;
              margin-top: 0;
              color: #111;
            "
          >
            Message
          </h3>

          <p
            style="
              white-space: pre-wrap;
              background-color: #f9fafb;
              padding: 16px;
              border-radius: 6px;
              border: 1px solid #f3f4f6;
              color: #4b5563;
              margin-top: 10px;
            "
          >
            ${message}
          </p>

        </div>

        <div
          style="
            background-color: #f9fafb;
            padding: 16px;
            text-align: center;
            font-size: 12px;
            color: #999;
            border-top: 1px solid #e0e0e0;
          "
        >
          Sent automatically from Portfolio Server.
        </div>

      </div>
    `,
  };

  // --------------------------------------------------
  // SMTP Check
  // --------------------------------------------------

  const hasUser =
    process.env.SMTP_USER &&
    process.env.SMTP_USER !== 'your-email@gmail.com';

  const hasPass =
    process.env.SMTP_PASS &&
    process.env.SMTP_PASS !== 'your-app-password';

  if (!hasUser || !hasPass) {
    console.log(
      '\n--- EMAIL SIMULATION MODE ---'
    );

    console.log('To:', mailOptions.to);
    console.log('Subject:', mailOptions.subject);
    console.log('Text:', mailOptions.text.trim());

    console.log(
      '--------------------------------\n'
    );

    return res.status(200).json({
      success: true,
      simulated: true,
      message:
        'Email inquiry successfully processed in Simulation Mode.',
    });
  }

  // --------------------------------------------------
  // Nodemailer
  // --------------------------------------------------

  const smtpPort = parseInt(
    process.env.SMTP_PORT || '587',
    10
  );

  const transporter = nodemailer.createTransport({
    host:
      process.env.SMTP_HOST ||
      'smtp.gmail.com',

    port: smtpPort,

    secure: smtpPort === 465,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail(mailOptions);

    console.log(
      `[Success] Email sent to ${mailOptions.to}`
    );

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    });

  } catch (error) {

    console.error(
      '[Error] Failed to send email:',
      error
    );

    return res.status(500).json({
      error:
        'Failed to deliver message. Please try again later.',
    });
  }
});

// --------------------------------------------------
// Start Server
// --------------------------------------------------

app.listen(PORT, '0.0.0.0', () => {

  console.log(
    `Server is running on port ${PORT}`
  );

  console.log(
    `Health check available at /health`
  );

  const hasUser =
    process.env.SMTP_USER &&
    process.env.SMTP_USER !== 'your-email@gmail.com';

  const hasPass =
    process.env.SMTP_PASS &&
    process.env.SMTP_PASS !== 'your-app-password';

  if (!hasUser || !hasPass) {

    console.log(
      'SMTP credentials are not configured.'
    );

    console.log(
      'Running in EMAIL SIMULATION MODE.'
    );

  } else {

    console.log(
      `SMTP configured for: ${process.env.SMTP_USER}`
    );

  }
});