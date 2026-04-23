import { browser } from '$app/environment';
import type { Attachment } from 'svelte/attachments';

let lazyio: any;

if (browser) {

  if (IntersectionObserver) {

    lazyio = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // load image from data-img
          const img = entry.target as any;
          img.onload = () => {
            // _debug(img.src, entry.target.getAttribute('alt'));
            img.classList.remove('loading');
          };
          const src = img.getAttribute('data-src');
          img.setAttribute('src', src);
          observer.unobserve(img);
        }
      });
    }, {
      threshold: 0,
      rootMargin: '1000px' // the default chrome is over 2000px
    });
  }
}


export function lazy(url: string): Attachment {
  return (element: HTMLImageElement) => {
    if (!element) return;
    // FIXME: this might case flicker if server loads faster than client

    if (!browser || !IntersectionObserver) {
      element.src = url; // element.getAttribute('data-src');
      return;
    }

    const emptySrc = element.src;
    element.classList.add('loading');
    element.setAttribute('data-src', url);

    element.onerror = () => {
      // if error, retrieve original data-src
      element.src = emptySrc;
      element.classList.remove('loading');
    };

    lazyio.observe(element);

    return () => {
      // destroy
      lazyio.unobserve(element);
      // lazyio.disconnect();
    };
  };
}
