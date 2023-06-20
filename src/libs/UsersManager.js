const { Collection, EmbedBuilder } = require("discord.js");
const EventEmitter = require("events");
const { Users } = require("../db-objects.js");

class UsersManager {
  // Data storage
  users = new Collection();
  hanging_auth = new Collection();

  // Communication between Discord and osu!
  emitter = new EventEmitter();
  events = {
    "auth_recieved": async (banchoUser, authString) => {
      // To prevent users from sending link to bancho multiple times
      // and racing this emitter, causing errors
      const stale_auth = this.hanging_auth.get(authString);
      if (!stale_auth) return;
      const discord_id = stale_auth.id;
      this.hanging_auth.delete(authString);
      const bailOut = (ec) => {
        this.hanging_auth.set(authString, { "id": discord_id, "authString": authString });
        console.warn(`UsersMager.emitter.auth_recieved bailed with code ${ec}`);
        return;
      };

      // Get osu user info from api
      await banchoUser.fetchFromAPI();
      if (!("id" in banchoUser)) return bailOut(1);
      // Get the discord user
      const discord_user = await this.client.users.fetch(discord_id);
      if (!discord_user) return bailOut(2);
      // Add the users ids to our db and local
      const newUser = await Users.create({ "discord_id": discord_id, "osu_id": banchoUser.id });
      this.users.set(newUser.discord_id, newUser);
      // Confirm the auth with user on bancho and discord
      const baseEmbed = new EmbedBuilder()
        .setColor("#821a99")
        .setDescription(`Successfully linked to osu! account: \`${banchoUser.ircUsername}\``);
      await discord_user.send({ embeds: [baseEmbed] });
      await banchoUser.sendMessage(`Successfully linked to Discord account: ${discord_user.username}`);
    },
  };

  genAuthString = () => {
    // Random 20 char alpha-numeric string
    const auth = Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join("");
    // Check the one in a million chance its been gend already
    if (this.hanging_auth.get(auth)) {
      return this.genAuthString();
    }
    return auth;
  };

  constructor(client) {
    this.init(client);
  }

  async init(client) {
    // Store a reference to client
    this.client = client;
    // Store users
    const users = await Users.findAll();
    for (const user of users) {
      this.users.set(user.discord_id, user);
    }
    // Start listening for events
    for (const [evname, callback] of Object.entries(this.events)) {
      this.emitter.on(evname, (...args) => callback(...args));
    }
  }

  async auth(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const { client: { banchoClient }, user: { id } } = interaction;
    const baseEmbed = new EmbedBuilder().setColor("#821a99");

    // Try and find an existing authed user or one with a pending auth
    const stale_auth = this.hanging_auth.find((v) => v.id === id);
    if (stale_auth) {
      const { authString } = stale_auth;
      baseEmbed.setDescription(`Your Discord account is already pending a link!\n
      To link your account, open osu! and send this message to user 
      \`${banchoClient.getSelf().ircUsername}\` using **ingame** chat:\n\`!link ${authString}\``);
      return interaction.followUp({ embeds: [baseEmbed] });
    }
    const curUser = this.users.get(id);
    if (curUser) {
      const banchoUser = await banchoClient.getUserById(curUser.osu_id);
      baseEmbed.setDescription(`Your Discord account is already linked to the osu account:
       \`${banchoUser.ircUsername}\``);
      return interaction.followUp({ embeds: [baseEmbed] });
    }

    // Start the auth process
    const authString = this.genAuthString();
    baseEmbed.setDescription(`To link your account, open osu! and send this message to user 
    \`${banchoClient.getSelf().ircUsername}\` using **ingame** chat:\n\`!link ${authString}\``);
    await interaction.followUp({ embeds: [baseEmbed] });
    // Add the discord id and auth string to available auths for the listener
    this.hanging_auth.set(authString, { "id": id, "authString": authString });
  }
}

module.exports = UsersManager;