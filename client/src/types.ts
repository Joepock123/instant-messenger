export type IConversation = {
  selected: boolean;
  recipients: Array<IRecipient>;
};

export type IRecipient = {
  name: string;
};
