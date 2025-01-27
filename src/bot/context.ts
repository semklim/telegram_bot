import type { AutoChatActionFlavor } from '@grammyjs/auto-chat-action';
import type { ConversationFlavor } from '@grammyjs/conversations';
import type { HydrateFlavor } from '@grammyjs/hydrate';
import type { I18nFlavor } from '@grammyjs/i18n';
import type { ParseModeFlavor } from '@grammyjs/parse-mode';
import type { Update, UserFromGetMe } from '@grammyjs/types';
import {
  type Api,
  Context as DefaultContext,
  type SessionFlavor,
} from 'grammy';

import type { Logger } from '#root/logger.js';

export interface SessionData {
  timeout?: number;
  prevMenu?: string;
  userId?: number;
}

interface ExtendedContextFlavor {
  logger: Logger;
}

export type Context = ParseModeFlavor<
  HydrateFlavor<
    DefaultContext &
      ExtendedContextFlavor &
      SessionFlavor<SessionData> &
      I18nFlavor &
      ConversationFlavor &
      AutoChatActionFlavor
  >
>;

interface Dependencies {
  logger: Logger;
}

export function createContextConstructor({ logger }: Dependencies) {
  return class extends DefaultContext implements ExtendedContextFlavor {
    logger: Logger;

    constructor(update: Update, api: Api, me: UserFromGetMe) {
      super(update, api, me);

      Object.defineProperty(this, 'logger', {
        writable: true,
      });

      this.logger = logger.child({
        update_id: this.update.update_id,
      });
    }
  } as unknown as new (update: Update, api: Api, me: UserFromGetMe) => Context;
}
