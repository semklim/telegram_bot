import type { Conversation } from '@grammyjs/conversations';
import { createConversation } from '@grammyjs/conversations';

import type { Context } from '#root/bot/context.js';
import { getLocalCode, hasLocal, i18n } from '#root/bot/i18n.js';

import {
  createCustomLanguageKeyboard,
  createMainMenuKeyboard,
} from '../keyboards/index.js';

export const LANGUAGE_CONVERSATION = 'language';

export function languageConversation() {
  return createConversation(
    async (conversation: Conversation<Context>, ctx: Context) => {
      await conversation.run(i18n);
      await ctx.reply(ctx.t('language.start'), {
        reply_markup: await createCustomLanguageKeyboard(ctx),
      });

      while (true) {
        ctx = await conversation.wait();

        if (ctx.hasText(ctx.t('language.cancel'))) {
          return ctx.reply(ctx.t('language.cancel'), {
            reply_markup: await createMainMenuKeyboard(ctx),
          });
        } else if (ctx.has('message:text') && hasLocal(ctx.msg.text)) {
          ctx.chatAction = 'typing';
          await conversation.sleep(1000);
          await ctx.i18n.setLocale(getLocalCode(ctx.msg.text));

          return ctx.reply(ctx.t('language.answer', { lang: ctx.msg.text }), {
            reply_markup: await createMainMenuKeyboard(ctx),
          });
        } else {
          await ctx.reply(ctx.t('language.not-valid'));
        }
      }
    },
    LANGUAGE_CONVERSATION,
  );
}
