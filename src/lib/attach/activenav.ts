import { page } from '$app/state';
import type { Attachment } from 'svelte/attachments';

export function activenav(classname: string, exact: boolean = true): Attachment {
  return (element: HTMLElement) => {
    const path = page.url.pathname;
    const href = element.getAttribute('href');
    let hasIt = exact ? path === href : path.startsWith(href);

    if (hasIt) {
      element.classList.add(classname);
      element.setAttribute('aria-current', 'page');
    } else {
      element.classList.remove(classname);
      element.removeAttribute('aria-current');
    }

    return () => {
      // destroy
    };
  };
}
