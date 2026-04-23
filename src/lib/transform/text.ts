
// fix this by cleaning up any wrong html
export const toHTML = (s: string): string => {

  // replace all style="*" to empty string
  let _content = s.replace(/style="[^"]*"/gi, '');
  // TODO: remove unsafe here
  // strip all image tags
  _content = _content.replace(/<img[^>]*>/gi, '');

  // strip all input, form, button and textarea

  _content = _content.replace(/<input[^>]*>/gi, '');
  _content = _content.replace(/<form[^>]*>/gi, '');
  _content = _content.replace(/<textarea\b[^>]*>(?:[\s\S]*?<\/textarea>|)/gi, '');
  _content = _content.replace(/<button\b[^>]*>([\s\S]*?)<\/button>/gi, '');
  _content = _content.replace(/<button[^>]*>/gi, '');

  // lookg for width="anything" and remove
  _content = _content.replace(/width="[^"]*"/gi, '');

  //  this was not right ?.replace(/\n/g, '<br>');
  return _content;
}


export const toText = (s: string, nl: boolean = false): string => {
  // remove html and keep br
  return s?.replace(/<[^>]*>/g, '').replace(/\n/g, nl ? '<br>' : ' ');;
}


