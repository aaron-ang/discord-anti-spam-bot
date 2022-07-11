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
const axios_1 = __importDefault(require("axios"));
const apiKey = process.env.API_KEY;
const urlRegexp = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?");
const pattern = new RegExp("(http|ftp|https)://[w-_]+(.[w-_]+)+([w-.,@?^=%&amp;:/~+#]*[w-@?^=%&amp;/~+#])?");
const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
var header = {
    client: {
        clientId: "discordAntiSpamBot",
        clientVersion: "1.0.0",
    },
    threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url: "dummy" }],
    },
};
module.exports = {
    name: "messageCreate",
    execute(message) {
        return __awaiter(this, void 0, void 0, function* () {
            // If message is sent by bot, return to prevent infinite loop
            if (message.author.bot)
                return;
            // Only start check if message contains HTTP prefix
            if (urlRegexp.test(message.content) === true) {
                const url = message.content.match(pattern)[0];
                header.threatInfo.threatEntries[0] = { url: url };
                yield axios_1.default
                    .post(apiUrl, header)
                    .then((res) => {
                    // If there are no matches, the HTTP POST response simply returns an empty object in the response body.
                    // Delete message if there is a match
                    if (res.data !== {}) {
                        message.delete(500);
                        message.channel.send("message detected as spam and deleted");
                    }
                })
                    .catch((error) => {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                    else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    }
                    else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                });
            }
        });
    },
};
