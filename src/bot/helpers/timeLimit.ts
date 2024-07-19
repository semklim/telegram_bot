import type { Conversation } from '@grammyjs/conversations';
import type { Context } from '#root/bot/context.js';

interface CustomWait {
  conversation: Conversation<Context>;
  timeout?: number;
  timeStart: number;
}

export async function wait({
  conversation,
  timeStart,
  timeout = 1000 * 3600 * 12,
}: CustomWait) {
  const start = timeStart || (await conversation.now());
  const ctx1 = await conversation.wait();
  const end = await conversation.now();

  if (end - start > timeout) {
    throw new Error('Timeout');
  }
  return ctx1;
}
