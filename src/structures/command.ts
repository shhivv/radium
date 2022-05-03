import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

type CallbackFunction = (ctx: CommandInteraction) => Promise<boolean>;

interface Result {
  commandResult: boolean;
  timeTaken: number;
}

export default class Command extends SlashCommandBuilder {
  callback!: CallbackFunction;

  setCallback(callback: CallbackFunction) {
    this.callback = callback;
    return this;
  }

  async execute(ctx: CommandInteraction): Promise<Result> {
    const start = performance.now();
    let commandResult = await this.callback(ctx);
    const elasped = performance.now() - start;

    return {
      commandResult,
      timeTaken: Math.round(elasped),
    };
  }
}
