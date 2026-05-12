"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpMail = exports.sendOrderMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "keyurdivan237@gmail.com",
        pass: "sqbm prmr uxon okoy ",
    },
});
const sendOrderMail = (email, customerName, product, amount) => __awaiter(void 0, void 0, void 0, function* () {
    yield transporter.sendMail({
        from: "keyurdivan237@gmail.com",
        to: email,
        subject: "✅ Order Confirmed",
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
});
exports.sendOrderMail = sendOrderMail;
const sendOtpMail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    yield transporter.sendMail({
        from: "keyurdivan237@gmail.com",
        to: email,
        subject: "KD Water OTP Verification",
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
});
exports.sendOtpMail = sendOtpMail;
