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
        Radium exposes information about your server to a RESTful API at [\`radium.shivs.me/:guildId\`](https://radium.shivs.me). By adding this bot to your server, you consent to your server being exposed over the API. If you change your mind, you can kick this bot and all data will be cleared.

        >>> **\`🛠️\` Usage**

         The scope of information required can be controlled by the \`include\` query parameter. The three scopes are listed below.  
        
         **minimum** - [\`radium.shivs.me/${guildId}?include=minimum\`](https://radium.shivs.me/${guildId}?include=minimum)
         **basic** - [\`radium.shivs.me/${guildId}\`](https://radium.shivs.me/${guildId})
         **all** - [\`radium.shivs.me/${guildId}?include=all\`](https://radium.shivs.me/${guildId}?include=all)

         
         **\`⚡\` Metrics**

         Currently monitoring \`${
          ctx.client.guilds.cache.size
         }\` guilds and can see \`${totalUsers}\` users.
         Developed by \`shiv#6819\` with \`discord.js(${version})\`
         Bot has been online since ${time(
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
        .setLabel("Join the support server")
        .setURL("https://discord.gg/zEaeb7p58y"),
      new MessageButton()
        .setStyle("LINK")
        .setLabel("Invite me")
        .setURL(
          `https://discord.com/oauth2/authorize?client_id=${ctx.applicationId}&permissions=2048&scope=bot%20applications.commands`
        ),
      new MessageButton()
        .setStyle("LINK")
        .setLabel("View source")
        .setURL(`https://github.com/ffaanngg/radium`)
    );
    await ctx.reply({ embeds: [embed], components: [row] });
    return true;
  });
