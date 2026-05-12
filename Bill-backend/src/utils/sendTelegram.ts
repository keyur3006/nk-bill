import axios from "axios";

const BOT_TOKEN =
  "8273543704:AAFQRvUSC3_bxllwwI2slMiATjSmJtT3VpI";

const CHAT_ID = "8478946426";

export const sendTelegramMessage =
  async (message: string) => {
    try {
      await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          chat_id: CHAT_ID,
          text: message,
        }
      );

      console.log(
        "Telegram notification sent"
      );
    } catch (error) {
      console.log(error);
    }
  };