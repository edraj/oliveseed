import { Config } from '$src/config';
import type { Attachment } from 'svelte/attachments';


export function painbutton(): Attachment {
  return (element: HTMLButtonElement) => {
    if (!element) return;
    const _form = element.closest('form');
    if (_form) {
      _form.addEventListener('submit', () => {
        element.disabled = true;;
        setTimeout(() => element.disabled = false, Config.Basic.dblClickTimeout);
      });
    } else {
      // disable self
      element.addEventListener('click', () => {
        element.disabled = true;
        setTimeout(() => element.disabled = false, Config.Basic.dblClickTimeout);
      });
    }
    return () => {
      // destroy
    };
  };

};
export function painlink(): Attachment {
  return (element: HTMLAnchorElement) => {
    if (!element) return;
      // disable self
      element.addEventListener('click', () => {
        // using css point events
        element.classList.add('disabled');
        setTimeout(() => element.classList.remove('disabled'), Config.Basic.dblClickTimeout);
      });
    return () => {
      // destroy
    };
  };

};

export function painform(): Attachment {
  return (element: HTMLFormElement) => {

    const _buttons = element.querySelectorAll('button');
    element.addEventListener('submit', () => {
      _buttons.forEach(b => b.disabled = true);

      // VER_NEXT: do better, detect external loading status
      setTimeout(() => _buttons.forEach(b => b.disabled = false), Config.Basic.dblClickTimeout);
    });
    return () => {
      // destroy
    };
  };

};
