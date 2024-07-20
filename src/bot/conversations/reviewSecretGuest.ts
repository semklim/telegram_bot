import type { Conversation } from '@grammyjs/conversations';
import { createConversation } from '@grammyjs/conversations';

import type { Context } from '#root/bot/context.js';
import { i18n } from '#root/bot/i18n.js';
import { createMainMenuKeyboard } from '../keyboards/index.js';

import { SHARE_CONTACT_CONVERSATION } from './shareContact.js';

export const SECRET_GUEST_CONVERSATION = 'secret_guest';

export function secretGuestConversation() {
  return createConversation(
    async (conversation: Conversation<Context>, ctx: Context) => {
      await conversation.run(i18n);
      await ctx.reply(ctx.t('secret-guest.start'));
      return await ctx.conversation.enter(SHARE_CONTACT_CONVERSATION);
    },
    SECRET_GUEST_CONVERSATION,
  );
}
