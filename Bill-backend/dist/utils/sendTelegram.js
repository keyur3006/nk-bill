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
exports.sendTelegramMessage = void 0;
const axios_1 = __importDefault(require("axios"));
const BOT_TOKEN = "8273543704:AAFQRvUSC3_bxllwwI2slMiATjSmJtT3VpI";
const CHAT_ID = "8478946426";
const sendTelegramMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });
        console.log("Telegram notification sent");
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendTelegramMessage = sendTelegramMessage;
