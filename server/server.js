const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  // You can get lots of details from the handshake object
  const id = socket.handshake.query.id;
  //   Adds the socket to the given room or to the list of rooms.
  socket.join(id);

  socket.on("sent-message", ({ recipients, text, selectedConversationId }) => {
    console.log("text: ", text);
    console.log("recipients: ", recipients);

    // Send the message to each recipient in recipients array
    // Send them recipients array without their own id

    recipients.forEach((recipientId) => {
      const userSpecificRecipientsList = recipients
        // Remove recipients own id from the list
        .filter((r) => r !== recipientId);
      // Push the senders id onto the list
      userSpecificRecipientsList.push(id);
      console.log("userSpecificRecipientsList", userSpecificRecipientsList);
      // Send the message to each recipient connected to the websocket on their socket identified by their specfic id
      socket.broadcast.to(recipientId).emit("receive-message", {
        recipients: userSpecificRecipientsList,
        senderId: id,
        text,
        selectedConversationId,
      });
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
