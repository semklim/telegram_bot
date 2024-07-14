import { Composer } from 'grammy';

import type { Context } from '#root/bot/context.js';
import { logHandle } from '#root/bot/helpers/logging.js';

import { START_CONVERSATION } from '../conversations/index.js';

const composer = new Composer<Context>();

const feature = composer.chatType('private');

feature.command('start', logHandle('command-start'), (ctx) => {
  ctx.session.prevMenu = 'main';
  ctx.session.userId = ctx.from.id;
  return ctx.conversation.enter(START_CONVERSATION);
});

export { composer as welcomeFeature };
