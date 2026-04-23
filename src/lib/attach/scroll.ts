

let SCROLL_POSITION = 0;
let END_SCROLL_POSITION = 0;
let inThrottle = false;
export const doScroll = () => {
  // throttle this

  if (!inThrottle) {
    inThrottle = true;
    setTimeout(() => {
      if (SCROLL_POSITION >= window.scrollY) {
        document.body.classList.add('sc_up');
        document.body.classList.remove('sc_down', 'sc_end_down');
      } else {
        document.body.classList.add('sc_down');
        document.body.classList.remove('sc_up', 'sc_end_up');
      }
      SCROLL_POSITION = window.scrollY;
      inThrottle = false;
    }, 500);
  }

};
export const endScroll = (e) => {

  if (END_SCROLL_POSITION >= window.scrollY) {
    document.body.classList.add('sc_end_up');
    document.body.classList.remove('sc_end_down');
  } else {
    document.body.classList.add('sc_end_down');
    document.body.classList.remove('sc_end_up');
  }
  END_SCROLL_POSITION = window.scrollY;

}



