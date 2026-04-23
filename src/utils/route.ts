import { base } from '$app/paths';
import { Res } from "$utils/resources";

export const routeLink = (url: string): string => {
  // prefix with language
  return `${base}/${Res.language}${url}`;
};

export const plainPath = (path: string): string => {
  return path.replace(`${Res.language}`, '');
};
