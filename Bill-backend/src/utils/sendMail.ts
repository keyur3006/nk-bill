import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "keyurdivan237@gmail.com",

      pass: "sqbm prmr uxon okoy ",
    },
  });

export const sendOrderMail =
  async (
    email: string,
    customerName: string,
    product: string,
    amount: number
  ) => {

    await transporter.sendMail({
      from:
        "keyurdivan237@gmail.com",

      to: email,

      subject:
        "✅ Order Confirmed",

      html: `
        <h2>
          Order Successful 🎉
        </h2>

        <p>
          Hello ${customerName},
        </p>

        <p>
          Your order has been placed successfully.
        </p>

        <p>
          <b>Product:</b>
          ${product}
        </p>

        <p>
          <b>Total:</b>
          ₹${amount}
        </p>

        <p>
          Thank you for ordering ❤️
        </p>
      `,
    });

    console.log("Email sent");
};
export const sendOtpMail =
  async (
    email: string,
    otp: string
  ) => {

    await transporter.sendMail({
      from:
        "keyurdivan237@gmail.com",

      to: email,

      subject:
        "KD Water OTP Verification",

      html: `
        <h2>
          Email Verification
        </h2>

        <p>
          Your OTP is:
        </p>

        <h1>
          ${otp}
        </h1>

        <p>
          OTP valid for 5 minutes
        </p>
      `,
    });

    console.log("OTP Email Sent");
};