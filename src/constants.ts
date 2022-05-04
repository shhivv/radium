import { Intents, ClientOptions } from "discord.js";

const { GUILDS,GUILD_EMOJIS_AND_STICKERS,GUILD_MEMBERS,GUILD_SCHEDULED_EVENTS } = Intents.FLAGS;

export let clientOptions: ClientOptions = {
  intents: [GUILDS, GUILD_EMOJIS_AND_STICKERS, GUILD_MEMBERS, GUILD_SCHEDULED_EVENTS],
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
