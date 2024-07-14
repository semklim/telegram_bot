import { Keyboard } from 'grammy';
import ISO6391 from 'iso-639-1';

import type { Context } from '#root/bot/context.js';
import { chunk } from '#root/bot/helpers/keyboard.js';
import { i18n } from '#root/bot/i18n.js';

export async function createCustomLanguageKeyboard(ctx: Context) {
  const currentLocaleCode = await ctx.i18n.getLocale();

  const getLabel = (code: string) => {
    const isActive = code === currentLocaleCode;

    return `${isActive ? '✅ ' : ''}${ISO6391.getNativeName(code)}`;
  };

  const buttons = i18n.locales.map((localeCode) =>
    Keyboard.text(getLabel(localeCode)),
  );

  buttons.push(Keyboard.text(ctx.t('language.cancel')));

  return Keyboard.from(chunk(buttons, 2)).resized();
}
