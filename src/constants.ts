import { Intents, ClientOptions } from "discord.js";

export let clientOptions: ClientOptions = {
  intents: [Intents.FLAGS.GUILDS],
  allowedMentions: {
    parse: ["roles", "users"],
  },
  presence: {
    status: "online",
    activities: [
      {
        type: "WATCHING",
        name: "your server",
      },
    ],
  },
};
