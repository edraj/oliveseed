import { dev } from '$app/environment';
import { LanguageHook } from '$core/language.hook';
import { type ServerInit } from '@sveltejs/kit';




export const init: ServerInit = async () => {

  global._attn = (o, message) => {
    if (dev) {
      console.log('\x1b[43m %s \x1b[0m', message, o);
    }
  };

  global._debug = (o, message, type) => {
    if (dev) {
      const color = type === 'e' ? 31 : type === 'p' ? 33 : 32;
      console.log(`\x1b[${color}m %s \x1b[0m`, message, o);
    }
  };

};

export const handle = dev ? LanguageHook : null;

