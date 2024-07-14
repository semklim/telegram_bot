import { Keyboard } from 'grammy';
import type { KeyboardButton } from 'grammy/types';

import { chunk } from '#root/bot/helpers/keyboard.js';

export async function createMenuKeyboard(
  buttons: KeyboardButton.CommonButton[],
) {
  return Keyboard.from(chunk(buttons, 2)).resized();
}
