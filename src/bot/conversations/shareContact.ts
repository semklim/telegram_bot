import type { Conversation } from '@grammyjs/conversations';
import { createConversation } from '@grammyjs/conversations';

import type { Context } from '#root/bot/context.js';
import { i18n } from '#root/bot/i18n.js';

import {
  createShareContactMenuKeyboard,
  createMainMenuKeyboard,
} from '../keyboards/index.js';

export const SHARE_CONTACT_CONVERSATION = 'share_contact';

export function shareContactConversation() {
  return createConversation(
    async (conversation: Conversation<Context>, ctx: Context) => {
      await conversation.run(i18n);

      await ctx.reply(ctx.t('share-contact.start'), {
        reply_markup: await createShareContactMenuKeyboard(ctx),
      });

      while (true) {
        ctx = await conversation.wait();

        if (ctx.hasText(ctx.t('share-contact.btn'))) {
          return ctx.reply('', {
            reply_markup: await createMainMenuKeyboard(ctx),
          });
        } else if (ctx.has('msg:contact')) {
          ctx.chatAction = 'typing';
          return ctx.reply(ctx.t('share-contact.answer'));
        } else {
          await ctx.reply(ctx.t('share-contact.not-valid'));
        }
      }
    },
    SHARE_CONTACT_CONVERSATION,
  );
}
