export type IConversation = {
  conversationId: string;
  messages: Array<any>;
  recipients: Array<IContact>;
};

export type IContact = {
  name: string;
  id: string;
};
