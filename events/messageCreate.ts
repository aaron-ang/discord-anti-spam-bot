import axios, { AxiosError, AxiosResponse } from "axios";

const apiKey = process.env.API_KEY;
const urlRegexp = new RegExp(
  "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
);
const pattern = new RegExp(
  "(http|ftp|https)://[w-_]+(.[w-_]+)+([w-.,@?^=%&amp;:/~+#]*[w-@?^=%&amp;/~+#])?"
);
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
  async execute(message: {
    author: { bot: any };
    content: string;
    delete: (arg0: number) => void;
    channel: { send: (arg0: string) => void };
  }) {
    // If message is sent by bot, return to prevent infinite loop
    if (message.author.bot) return;

    // Only start check if message contains HTTP prefix
    if (urlRegexp.test(message.content) === true) {
      const url = message.content.match(pattern)![0];
      header.threatInfo.threatEntries[0] = { url: url };
      await axios
        .post(apiUrl, header)
        .then((res: AxiosResponse) => {
          // If there are no matches, the HTTP POST response simply returns an empty object in the response body.
          // Delete message if there is a match
          if (res.data !== {}) {
            message.delete(500);
            message.channel.send("message detected as spam and deleted");
          }
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    }
  },
};
