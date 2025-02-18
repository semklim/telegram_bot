import { autoChatAction } from '@grammyjs/auto-chat-action';
import { conversations } from '@grammyjs/conversations';
import { hydrate } from '@grammyjs/hydrate';
import { hydrateReply, parseMode } from '@grammyjs/parse-mode';
import { FileAdapter } from '@grammyjs/storage-file';
import type { BotConfig, StorageAdapter } from 'grammy';
import { Bot as TelegramBot, session } from 'grammy';

import type { Context, SessionData } from '#root/bot/context.js';
import { createContextConstructor } from '#root/bot/context.js';
import {
  languageConversation,
  secretGuestConversation,
  shareContactConversation,
  startConversation,
} from '#root/bot/conversations/index.js';
import {
  adminFeature,
  languageFeature,
  unhandledFeature,
  welcomeFeature,
} from '#root/bot/features/index.js';
import { errorHandler } from '#root/bot/handlers/index.js';
import { i18n, isMultipleLocales } from '#root/bot/i18n.js';
import { updateLogger } from '#root/bot/middlewares/index.js';
import { config } from '#root/config.js';
import { logger } from '#root/logger.js';

import { workflowFeature } from './features/workflow.js';

interface Options {
  sessionStorage?: StorageAdapter<SessionData>;
  config?: Omit<BotConfig<Context>, 'ContextConstructor'>;
}

export function createBot(token: string, options: Options = {}) {
  const { sessionStorage } = options;
  const bot = new TelegramBot(token, {
    ...options.config,
    ContextConstructor: createContextConstructor({ logger }),
  });
  const protectedBot = bot.errorBoundary(errorHandler);

  // Middlewares
  bot.api.config.use(parseMode('HTML'));

  if (config.isDev) protectedBot.use(updateLogger());

  protectedBot.use(autoChatAction(bot.api));
  protectedBot.use(hydrateReply);
  protectedBot.use(hydrate());
  protectedBot.use(
    session({
      initial: () => ({}),
      storage:
        sessionStorage ??
        new FileAdapter({
          dirName: 'sessions',
        }),
    }),
  );
  protectedBot.use(i18n);
  protectedBot.use(conversations());
  protectedBot.use(startConversation());
  protectedBot.use(languageConversation());
  protectedBot.use(secretGuestConversation());
  protectedBot.use(shareContactConversation());

  // Handlers
  protectedBot.use(welcomeFeature);
  protectedBot.use(adminFeature);

  console.log(isMultipleLocales);

  if (isMultipleLocales) {
    protectedBot.use(languageFeature);
  }

  protectedBot.use(workflowFeature);
  // must be the last handler
  protectedBot.use(unhandledFeature);

  return bot;
}

export type Bot = ReturnType<typeof createBot>;
