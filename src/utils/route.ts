import { Res } from "$utils/resources";

export const routeLink = (url: string): string => {
  // prefix with language
  return `/${Res.language}${url}`;
};
