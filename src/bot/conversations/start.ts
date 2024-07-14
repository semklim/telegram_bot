import type { Conversation } from '@grammyjs/conversations';
import { createConversation } from '@grammyjs/conversations';

import type { Context } from '#root/bot/context.js';
import { getLocalCode, hasLocal, i18n } from '#root/bot/i18n.js';

import {
  createCustomLanguageKeyboard,
  createMainMenuKeyboard,
} from '../keyboards/index.js';

export const START_CONVERSATION = 'start';

export function startConversation() {
  return createConversation(
    async (conversation: Conversation<Context>, ctx: Context) => {
      await conversation.run(i18n);
      await ctx.reply(ctx.t('start.start'), {
        reply_markup: await createCustomLanguageKeyboard(ctx),
      });

      while (true) {
        ctx = await conversation.wait();

        if (ctx.hasText(ctx.t('start.cancel'))) {
          return ctx.reply(ctx.t('start.cancel'), {
            reply_markup: await createMainMenuKeyboard(ctx),
          });
        }
        else if (ctx.has('message:text') && hasLocal(ctx.msg.text)) {
          ctx.chatAction = 'typing';
          await conversation.sleep(1000);
          await ctx.i18n.setLocale(getLocalCode(ctx.msg.text));

          return ctx.reply(ctx.t('start.answer'), {
            reply_markup: await createMainMenuKeyboard(ctx),
          });
        }
        else {
          await ctx.reply('start.not-valid');
        }
      }
    },
    START_CONVERSATION,
  );
}
