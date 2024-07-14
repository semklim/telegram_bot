import { Composer } from 'grammy';

import type { Context } from '#root/bot/context.js';
import { logHandle } from '#root/bot/helpers/logging.js';

import { LANGUAGE_CONVERSATION } from '../conversations/changeLanguage.js';

const composer = new Composer<Context>();

const feature = composer.chatType('private');

feature.command('language', logHandle('command-language'), (ctx) => {
  return ctx.conversation.enter(LANGUAGE_CONVERSATION);
});

export { composer as languageFeature };
