import { time } from "@discordjs/builders";
import { MessageEmbed, version } from "discord.js";
import Command from "../structures/command";

export default new Command()
  .setName("help")
  .setDescription("🛠️ Help on using the bot")
  .setCallback(async (ctx) => {

    if(!ctx.guild){
        ctx.reply({
            content: "This command cannot be used in DMs",
            ephemeral: true
        })
        return false;
    }
    const embed = new MessageEmbed()
      .setTitle("Radium")
      .setThumbnail(
        ctx.client.application?.iconURL() ?? ""
      )
      .setDescription(
        `
        You can access information about your server at anytime through the RESTful API at [radium.shivs.me/${ctx.guildId}](https://radium.shivs.me/${ctx.guildId}).

        If you wish to not expose information about your server on the API, simply kick the bot and you are good to go. No data is stored by the bot itself but other applications may track and store data exposed by the API.

        Developed by \`shiv#6819\` using \`discord.js(${version})\`

        Bot has been running since ${time(
            // @ts-ignore
            ctx.client.startedAt,
            "R"
        )} and has a websocket latency of \`${ctx.client.ws.ping}ms\`.
      `
      )
      .setColor("#4ade80");
    await ctx.reply({ embeds: [embed] });
    return true;
  });