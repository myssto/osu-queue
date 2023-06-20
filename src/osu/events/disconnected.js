module.exports = {
  name: "disconnected",
  once: true,
  async execute({ banchoClient }) {
    console.error(`❌ Disconnected from Bancho as ${banchoClient.getSelf().ircUsername}`);
  },
};