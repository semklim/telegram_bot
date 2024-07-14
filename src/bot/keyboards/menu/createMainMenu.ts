import { Keyboard } from 'grammy';

import type { Context } from '#root/bot/context.js';

import { createMenuKeyboard } from './createMenu.js';

export function createMainMenuKeyboard(ctx: Context) {
  const menu = [
    Keyboard.text(ctx.t('main_menu.secret-guest')),
    Keyboard.text(ctx.t('main_menu.manager')),
  ];

  return createMenuKeyboard(menu);
}
