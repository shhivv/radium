import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import { Client, ClientOptions, CommandInteraction } from "discord.js";
import Command from "./command";

export default class Radium extends Client {
  commands: Map<string, Command>;
  startedAt: Date;
  ready;

  constructor(options: ClientOptions) {
    super(options);

    this.startedAt = new Date();
    this.commands = new Map();
    this.ready = false;

    this.once("ready", () => {
      console.log(`Booting up with profile: ${this.user?.tag}`);
      this.ready = true;
    });

    this.on("interactionCreate", async (interaction) => {
      if (interaction.isCommand()) {
        await this.handle(interaction);
      }
    });

    this.on("shardError", (e, id) => {
      console.error(`Shard ${id} errored with ${e}`);
    });
    process.on("uncaughtRejection", console.error);

    this.on("debug",console.debug);
    this.on("warn",console.warn);
  }

  registerCommand(command: Command) {
    this.commands.set(command.name, command);
    return this;
  }

  private async handle(interaction: CommandInteraction) {
    const command = this.commands.get(interaction.commandName);
    if (!command) return;

    try {
      const res = await command.execute(interaction);
      if (res.commandResult) {
        console.log(
          `Command ${interaction.commandName} invoked by ${interaction.user.tag}(${interaction.user.id}) ran successfully in ${res.timeTaken}ms`
        );
      } else {
        console.error(
          `Command ${interaction.commandName} invoked by ${interaction.user} failed!`
        );
      }
    } catch (e: any) {
      console.error(
        JSON.stringify({
          e: e.stack,
          command: interaction.toString(),
        })
      );

      try {
        interaction.reply({
          content: "Something went wrong!",
          ephemeral: true,
        });
      } catch {}
    }
  }

  async deployCommands(token: string, devGuildId: string, botClientId: string) {
    const rest = new REST({ version: "9" }).setToken(token);
    await rest.put(Routes.applicationCommands(botClientId), {
      body: Array.from(this.commands.values()).map((command) =>
        command.toJSON()
      ),
    });

    await rest.put(Routes.applicationGuildCommands(botClientId, devGuildId), {
      body: Array.from(this.commands.values()).map((command) =>
        command.toJSON()
      ),
    });
  }
}