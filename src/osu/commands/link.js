module.exports = {
  name: "link",
  PM: true,
  async execute(client, { user }, argv) {
    const authString = argv.shift();
    client.usrManager.emitter.emit("auth_recieved", user, authString);
  },
};