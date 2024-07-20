import { Keyboard } from 'grammy';
import type { KeyboardButton } from 'grammy/types';

import { chunk } from '#root/bot/helpers/keyboard.js';

export async function createMenuKeyboard(
  buttons: KeyboardButton.CommonButton[],
  btnInRow = 2,
) {
  return Keyboard.from(chunk(buttons, btnInRow)).resized();
}
