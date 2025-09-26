
import { Config } from '$src/config';
import { HttpInterctor } from '$src/core/http.interceptors';
import { Res } from '$src/utils/resources';
import axios from 'axios';


const buildTime = import.meta.env.VITE_BUILD_TIME || Date.now();

export const DataUrl = (url: string) => {
  return Config.API.local[url].replace(':lang', Res.language) + '?v=' + buildTime;
};

const dataClient = axios.create({
  baseURL: '/', // thisi s local
});

HttpInterctor(dataClient);
export default dataClient;

