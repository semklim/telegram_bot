import { Composer } from 'grammy';

import type { Context } from '#root/bot/context.js';
import { logHandle } from '#root/bot/helpers/logging.js';
import { createMainMenuKeyboard } from '../keyboards/index.js';
import { SECRET_GUEST_CONVERSATION } from '../conversations/reviewSecretGuest.js';

const composer = new Composer<Context>();

const feature = composer.chatType('private');

feature.on(':text', logHandle('workflow-:text'), async (ctx) => {
  const cmd = ctx.msg.text;

  switch (cmd) {
    case ctx.t('main_menu.secret-guest'): {
      // ctx.reply(ctx.t('main_menu.secret-guest'));
      await ctx.conversation.enter(SECRET_GUEST_CONVERSATION);
      break;
    }
    case ctx.t('main_menu.manager'): {
      ctx.reply(ctx.t('main_menu.manager'));
      break;
    }

    default:
      return ctx.reply(ctx.t('main_menu.unhandled'), {
        reply_markup: await createMainMenuKeyboard(ctx),
      });
  }
});

export { composer as workflowFeature };
