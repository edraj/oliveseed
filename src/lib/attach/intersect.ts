import { browser } from '$app/environment';
import type { Attachment } from 'svelte/attachments';


let intersectIo: any;

if (browser) {

  if (IntersectionObserver) {
    intersectIo = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fn = (<any>entry.target).fn;
          fn?.();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.0,
      rootMargin: '200px'
    });
  }
}


export function intersect(fn): Attachment {
  return (element: HTMLElement) => {
    if (!element || !IntersectionObserver) return;
    // sveltekit is ugly
    (<any>element).fn = fn;

    intersectIo.observe(element);

    return () => {
      // destroy
      intersectIo.disconnect();
    };
  };
}
