// this files i needed because the content must be loaded on server at one point

import { PageService } from '$src/services/page.service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  _seqlog('Root layout load');

  // get public content without payload
  const page = await PageService.GetPage(params.shortname);
  return {
    page,
  };
};
