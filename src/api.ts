import { Client, Guild } from "discord.js";
import fastify from "fastify";

interface IParams {
  id: string;
}

interface IQueryString {
  include: string;
}

interface Template {
  [key: string]: (guild: Guild) => any;
}

const templates: Template = {
  minimum(guild: Guild) {
    return {
      memberCount: guild.memberCount,
      channelCount: guild.channels.cache.size,
      roleCount: guild.roles.cache.size,
      emojiCount: guild.emojis.cache.size,
      stickerCount: guild.stickers.cache.size,
      iconUrl: guild.iconURL(),
      bannerUrl: guild.bannerURL(),
      splashUrl: guild.splashURL(),
      discoverySplashUrl: guild.discoverySplashURL(),
    };
  },

  basic(guild: Guild) {
    return {
      ...this.minimum(guild),
      available: guild.available,
      createdTimestamp: guild.createdTimestamp,
      description: guild.description,
      features: guild.features,
      ownerId: guild.ownerId,
      partnered: guild.partnered,
      premiumSubscriptionCount: guild.premiumSubscriptionCount,
    };
  },
  all(guild: Guild) {
    return {
      ...this.basic(guild),
      afkChannelId: guild.afkChannelId,
      afkTimeout: guild.afkTimeout,
      channels: guild.channels.cache,
      emojis: guild.emojis.cache,
      stickers: guild.stickers.cache,
      explicitContentFilter: guild.explicitContentFilter,
      large: guild.large,
      maximumBitrate: guild.maximumBitrate,
      maximumMembers: guild.maximumMembers,
      mfaLevel: guild.mfaLevel,
      nameAcronym: guild.nameAcronym,
      nsfwLevel: guild.nsfwLevel,
      preferredLocale: guild.preferredLocale,
      premiumProgressBarEnabled: guild.premiumProgressBarEnabled,
      premiumTier: guild.premiumTier,
      publicUpdatesChannelId: guild.publicUpdatesChannelId,
      roles: guild.roles.cache,
      rulesChannelId: guild.rulesChannelId,
      scheduledEvents: guild.scheduledEvents.cache,
      stageInstances: guild.stageInstances.cache,
      systemChannelId: guild.systemChannelId,
      systemChannelFlags: guild.systemChannelFlags,
      verificationLevel: guild.verificationLevel,
      verified: guild.verified,
      widgetChannelId: guild.widgetChannelId,
      widgetEnabled: guild.widgetEnabled,
    };
  },
};

export default function (client: Client) {
  const api = fastify({ logger: true });

  api.get("/", async (_req, _reply) => {
    return {
      monitoring: client.guilds.cache.size,
    };
  });

  api.get<{
    Params: IParams;
    Querystring: IQueryString;
  }>("/:id", async (req, reply) => {
    let guild: Guild;
    let { id } = req.params;

    try {
      guild = client.guilds.cache.get(id) ?? (await client.guilds.fetch(id));
    } catch {
      reply.code(404).send({
        monitoringGuild: false,
      });
      return;
    }

    let include = req.query.include ?? "basic";

    if (!["minimum", "basic", "all"].includes(include)) {
      include = "basic";
    }

    const bare = {
      monitoringGuild: true,
      monitoringSince: guild.joinedTimestamp,
      id: guild.id,
      name: guild.name,
    };

    return {
      ...bare,
      ...templates[include](guild),
    };
  });

  const port = process.env.PORT ?? 8000;
  const addr = process.env.ADDR ?? "127.0.0.1"

  api.listen(port, addr, (err, addr) => {
    if(err){
      console.error(err)
      process.exit(1)
    }else{
      console.log(`Webserver listening on ${addr}:${port}`)
    }
  });

}
