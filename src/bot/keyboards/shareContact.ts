import { Keyboard } from 'grammy';

import type { Context } from '#root/bot/context.js';

import { createMenuKeyboard } from './menu/createMenu.js';

export function createShareContactMenuKeyboard(ctx: Context) {
  const menu = [
    Keyboard.requestContact(ctx.t('share-contact.btn')),
    Keyboard.text(ctx.t('go-back')),
  ];

  return createMenuKeyboard(menu, 1);
}
