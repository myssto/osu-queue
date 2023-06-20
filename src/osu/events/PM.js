module.exports = {
  name: "PM",
  once: false,
  async execute(client, arg) {
    const { banchoClient } = client;
    const { message, self } = arg;
    if (self) return;
    if (message.startsWith("!")) {
      const argv = message.slice(1).split(/ +/);
      const c_name = argv.shift();
      const c = banchoClient.commands.get(c_name);
      if (c && c.PM) {
        c.execute(client, arg, argv).catch(e => {
          console.error(e);
        });
      }
    }
  },
};