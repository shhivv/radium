import Radium from "./structures/client";
import yargs from "yargs";
import help from "./commands/help";
import { clientOptions } from "./constants";

function deploySettings(env?: string) {
  switch (env ?? process.env.ENV) {
    case "PROD":
      return {
        dev: false,
        global: true,
      };

    default:
      return {
        dev: true,
        global: false,
      };
  }
}

async function main() {
  const flags = yargs(process.argv.slice(2))
    .options({
      token: { type: "string", default: process.env.DISCORD_TOKEN ?? "" },
      clientId: { type: "string", default: process.env.CLIENT_ID ?? "" },
      devGuildId: { type: "string", default: process.env.DEV_GUILD_ID ?? "" },
      deploy: { type: "string", default: undefined },
    })
    .parseSync();

  const { token, devGuildId, clientId, deploy } = flags;
  const client = new Radium(clientOptions).registerCommand(help);

  await client.deployCommands(
    token,
    devGuildId,
    clientId,
    deploySettings(deploy)
  );
  await client.login(token);
}

main().then(() => console.log("Connecting..."));
