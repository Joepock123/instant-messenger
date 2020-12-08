export type IConversation = {
  conversationId: string;
  text: string;
  recipients: Array<IContact>;
};

export type IContact = {
  name: string;
  id: string;
};
