module.exports = {
  name: "connected",
  once: true,
  async execute({ banchoClient }) {
    console.log(`✅ Logged into Bancho as ${banchoClient.getSelf().ircUsername}`);
  },
};