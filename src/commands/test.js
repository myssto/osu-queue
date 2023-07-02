const { SlashCommandBuilder } = require("discord.js");
const { v1, v2 } = require("osu-api-extended");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("pls work")
    .addStringOption(option => option.setName("opt").setDescription("option")),
  devOnly: true,
  async execute(interaction) {
    const { client } = interaction;
    const baseEmbed = client.defaultEmbed();
    if (interaction.user.id !== client.application.owner.id) {
      baseEmbed.setDescription("Only the bot owner can use this command");
      await interaction.reply({ embeds: [baseEmbed], ephemeral: true });
      return;
    }
    const beatmapid = interaction.options.getString("opt");
    // const bminfo = await v2.beatmap.id.details(beatmapid);
    const bmattr = await v1.beatmap.diff(beatmapid, { mods: 72 });
    // for (const obj in bmattr.difficulties) {
    //   console.log(obj);
    // }

    // console.log(bminfo);
    console.log(bmattr.difficulties);
    interaction.reply("I am working");
  },
};