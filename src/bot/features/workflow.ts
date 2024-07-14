import { Composer } from 'grammy';

import type { Context } from '#root/bot/context.js';
import { logHandle } from '#root/bot/helpers/logging.js';

const composer = new Composer<Context>();

const feature = composer.chatType('private');

feature.on(':text', logHandle('workflow-:text'), (ctx) => {
  const cmd = ctx.msg.text;

  switch (cmd) {
    case (ctx.t('main_menu.secret-guest')): {
      ctx.reply(ctx.t('main_menu.secret-guest'));
      break;
    }
    case (ctx.t('main_menu.manager')): {
      ctx.reply(ctx.t('main_menu.manager'));
      break;
    }

    default:
      return ctx.reply(ctx.t('main_menu.unhandled'));
  }
});

export { composer as workflowFeature };
