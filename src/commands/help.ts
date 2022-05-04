import { time } from "@discordjs/builders";
import {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  version,
} from "discord.js";
import Command from "../structures/command";

export default new Command()
  .setName("help")
  .setDescription("🛠️ Help on using the bot")
  .setCallback(async (ctx) => {
    if (!ctx.guild) {
      ctx.reply({
        content: "This command cannot be used in DMs",
        ephemeral: true,
      });
      return false;
    }

    const embed = new MessageEmbed()
      .setTitle("Radium")
      .setDescription(
        `
        Radium exposes information about your server to a RESTful API at \`radium.shivs.me/:guildId\`. 

        **The URL for this server is [radium.shivs.me/${
          ctx.guildId
        }](https://radium.shivs.me/${ctx.guildId}).**

        You can specify the scope of data required by the \`include\` query parameter. The 3 options are \`minimum\`, \`basic\` and \`all\`. If a query paramter is not specified, it defaults to \`basic\`.

        If you wish to stop exposing this server on the API, simply kick the bot and you are good to go. No data is stored by the bot itself but other applications may track and store data exposed by the API.

        Developed by \`shiv#6819\` using \`discord.js(${version})\`

        Bot has been running since ${time(
          // @ts-ignore
          ctx.client.startedAt,
          "R"
        )} and has a websocket latency of \`${ctx.client.ws.ping}ms\`.
      `
      )
      .setColor("#4ade80");

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Join our support server")
        .setURL("https://discord.gg/zEaeb7p58y")
    );
    await ctx.reply({ embeds: [embed], components: [row] });
    return true;
  });
