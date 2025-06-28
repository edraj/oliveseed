
import { Res } from '$src/utils/resources';
import axios from 'axios';


export const DataUrls = {
  roles: `/locale/roles.${Res.language}.json`,
  reports: `/locale/reports.${Res.language}.json`,
};

const dataClient = axios.create({
  baseURL: '/', // thisi s local
});


export default dataClient;

