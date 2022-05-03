import Radium from "./structures/client";
import yargs from "yargs";
import help from "./commands/help";
import { clientOptions } from "./constants";

async function main() {
  const flags = yargs(process.argv.slice(2))
    .options({
      token: { type: "string", default: process.env.DISCORD_TOKEN ?? "" },
      deploy: { type: "boolean", default: false },
      devGuild: { type: "string", default: process.env.DEV_GUILD_ID ?? "" },
      clientId: { type: "string", default: process.env.CLIENT_ID ?? "" },
    })
    .parseSync();

  const { token, devGuild, clientId, deploy } = flags;
  const client = new Radium(clientOptions)
    .registerCommand(help)

  if (deploy) {
    await client.deployCommands(token, devGuild, clientId);
  }

  await client.login(token);
}

main().then(() => console.log("Connecting..."));