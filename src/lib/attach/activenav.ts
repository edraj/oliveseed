import { page } from '$app/state';
import { plainPath } from '$src/utils/route';
import type { Attachment } from 'svelte/attachments';


const isActive = (href: string, exact: boolean) => {
  // remove language and web
  const path = plainPath(page.url.pathname);

  let hasIt = exact ? path === href : path.startsWith(href);
  return hasIt;
};

export function isactive(classname: string): Attachment {
  return (element: HTMLAnchorElement) => {
    const hasIt = isActive(plainPath(element.pathname), true);


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
