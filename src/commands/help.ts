import { time } from "@discordjs/builders";
import {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  version,
} from "discord.js";
import Command from "../structures/command";
import {
  apiBaseUrl,
  developer,
  defaultEmbedColor,
  supportServerUrl,
  repoUrl,
} from "../constants";

export default new Command()
  .setName("help")
  .setDescription("🛠️ Guide on using the bot")
  .setCallback(async (ctx) => {
    if (!ctx.guild) {
      ctx.reply({
        content: "This command can only be used in servers",
        ephemeral: true,
      });
      return false;
    }

    const totalUsers = ctx.client.guilds.cache.reduce(
      (acc, guild) => acc + guild.memberCount,
      0
    );

    const guildId = ctx.guildId;

    const embed = new MessageEmbed()
      .setTitle("`🚀` Radium")
      .setDescription(
        `
        Radium exposes information about your server to a RESTful API at [\`${apiBaseUrl}/:guildId\`](https://${apiBaseUrl}). By adding this bot to your server, you consent to your server being exposed over the API. If you change your mind, you can kick this bot and all data will be cleared.

        >>> **\`🛠️\` Usage**

         The scope of information required can be controlled by the \`include\` query parameter. The three scopes are listed below.  
        
         **minimum** - [\`${apiBaseUrl}/${guildId}?include=minimum\`](https://${apiBaseUrl}/${guildId}?include=minimum)
         **basic** - [\`${apiBaseUrl}/${guildId}\`](https://${apiBaseUrl}/${guildId})
         **all** - [\`${apiBaseUrl}/${guildId}?include=all\`](https://${apiBaseUrl}/${guildId}?include=all)

         
         **\`⚡\` Metrics**

         Currently monitoring \`${
           ctx.client.guilds.cache.size
         }\` guilds and can see \`${totalUsers}\` users.
         Developed by \`${developer}\` with \`discord.js(${version})\`.
         Bot has been online since ${time(
           // @ts-ignore
           ctx.client.startedAt,
           "R"
         )} and has a websocket latency of \`${ctx.client.ws.ping}ms\`.
      `
      )
      .setColor(defaultEmbedColor);

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setLabel("🔎 Join the support server")
        .setURL(supportServerUrl),
      new MessageButton()
        .setStyle("LINK")
        .setLabel("🔗 Invite me")
        .setURL(
          `https://discord.com/oauth2/authorize?client_id=${ctx.applicationId}&permissions=2048&scope=bot%20applications.commands`
        ),
      new MessageButton()
        .setStyle("LINK")
        .setLabel("🦄 View source")
        .setURL(repoUrl)
    );
    await ctx.reply({ embeds: [embed], components: [row] });
    return true;
  });
