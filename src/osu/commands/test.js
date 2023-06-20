module.exports = {
  name: "test",
  PM: true,
  async execute(client, { user }) {
    console.log(`${user.ircUsername} called [test]`);
    try {
      console.log(`Trying to send message to ${user.ircUsername}`);
      await user.sendMessage("You hit the test command :)");
    } catch (e) {
      console.error(e);
    } finally {
      console.log(`Successfully sent message to ${user.ircUsername}`);
    }
  },
};