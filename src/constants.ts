import { Intents, ClientOptions } from "discord.js";

const {
  GUILDS,
  GUILD_EMOJIS_AND_STICKERS,
  GUILD_MEMBERS,
  GUILD_SCHEDULED_EVENTS,
} = Intents.FLAGS;

export const clientOptions: ClientOptions = {
  intents: [
    GUILDS,
    GUILD_EMOJIS_AND_STICKERS,
    GUILD_MEMBERS,
    GUILD_SCHEDULED_EVENTS,
  ],
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

export const apiBaseUrl = "radium.shivs.me";
export const developer = "shiv#6819";
export const defaultEmbedColor = "#4ade80";
export const supportServerUrl = "https://discord.gg/zEaeb7p58y";
export const repoUrl = "https://github.com/ffaanngg/radium";
