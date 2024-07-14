import path from 'node:path';
import process from 'node:process';

import { I18n } from '@grammyjs/i18n';
import ISO6391 from 'iso-639-1';

import type { Context } from '#root/bot/context.js';

export const i18n = new I18n<Context>({
  defaultLocale: 'en',
  directory: path.resolve(process.cwd(), 'locales'),
  useSession: true,
  fluentBundleOptions: {
    useIsolating: false,
  },
});

export function hasLocal(str: string) {
  const code = getLocalCode(str);
  return i18n.locales.includes(code);
}

export const getLocalCode = (str: string) => {
  const locale = str.replace(/[\p{Emoji_Presentation}\p{Emoji}]\s*/gu, '');
  return ISO6391.getCode(locale);
};

export const isMultipleLocales = i18n.locales.length > 1;
