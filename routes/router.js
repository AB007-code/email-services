import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// let emailUser = process.env.EMAIL_USER;
// console.log(emailUser);
const routeHandler = async (req) => {
  try {
    // console.log(req.body);
    let { name, email, message, user } = req.body;
    console.log(user);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let clientEmailTemplate = `<div style="max-width: 600px; margin: 20px auto; background: #ffffff;
                border-radius: 10px; border: 1px solid #e0e0e0;
                box-shadow: 0 4px 12px rgba(0,0,0,0.08); font-family: Arial, sans-serif;">
      
      <!-- Header -->
      <div style="background: #222831; padding: 20px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
        <h2 style="margin: 0;">Thank You for Reaching Out!</h2>
      </div>

      <!-- Body -->
      <div style="padding: 25px;">
        <h2 style="color: #333; color:#F4511E; font-weight:800; margin-top: 0;">Hi ${name},</h2>
        <p style="color: #555; font-size: 15px; line-height: 1.6;">
          I’ve received your message from my portfolio website and I truly appreciate you taking the time to connect.
        </p>
        <p style="color: #555; font-size: 15px; line-height: 1.6;">
          I’ll get back to you as soon as possible, usually within <strong>24–48 hours</strong>.
        </p>

        <!-- Highlight -->
        <div style="margin: 20px 0; padding: 15px; background: #f1f7ff;
                    border-left: 4px solid #007bff; border-radius: 5px; color: #007bff;">
          <strong>Here’s what you sent me:</strong><br>
          "${message}"
        </div>

        <p style="font-size: 14px; color: #555;">
          Looking forward to speaking with you,<br>
          <strong>${name}</strong><br>
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #f7f7f7; padding: 15px; text-align: center; font-size: 13px; color: #555; border-radius: 0 0 10px 10px;">
        <div style="margin-bottom: 8px; font-weight: bold;">Connect with me</div>

        <!-- GitHub -->
       <div style="display: flex; align-items: center; font-size: 14px;">
       <div style="width:33.33%">
              <a href="https://github.com/AB007-code" style="text-decoration: none; color: #333;">
               <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" width="20" style="vertical-align: middle; margin-right: 5px;"> GitHub
              </a>
      </div>
  
      <div style="width:33.33%;">
            <a href="https://www.linkedin.com/in/abhilash-chaurasiya-1814b2138/" style="text-decoration: none; color: #0077b5;">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="20" style="vertical-align: middle; margin-right: 5px;"> LinkedIn
            </a>
     </div>

     <div style="width:33.33%;">
          <a style="color: #333;" href="tel:+919538450441">
           <img src="https://cdn-icons-png.flaticon.com/512/159/159832.png" width="20" style="vertical-align: middle; margin-right: 5px;"> +91 9538450441
          </a>
    </div>
    </div>
      </div>
    </div>`;

    let leadEmailTemplate = `<div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #0077b6, #00b4d8); padding: 16px 24px; color: #fff;">
        <h2 style="margin: 0; font-size: 20px;">📩 New Lead from Portfolio</h2>
      </div>

      <!-- Lead Details -->
      <div style="padding: 20px;">
        <p style="margin: 0 0 10px; font-size: 15px; color: #555;">You’ve received a new inquiry from your portfolio website.</p>
        
        <div style="border-left: 4px solid #0077b6; padding-left: 12px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0077b6;">${email}</a></p>
          <p style="margin: 5px 0;"><strong>Message:</strong></p>
          <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-size: 14px; color: #444;">
            ${message}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f9fafb; padding: 14px; text-align: center; font-size: 13px; color: #888;">
        Lead captured on ${new Date().toLocaleString()}
      </div>

    </div>
  </div>`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confrimation Email",
      html: clientEmailTemplate,
    };

    const mailOptions1 = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📢 New Portfolio Lead from ${name}`,
      html: leadEmailTemplate,
    };
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions1);
    console.log("Message Sent Successfully");
  } catch (err) {
    console.log(err.message);
  }
};

export default routeHandler;
