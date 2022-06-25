import axios from 'axios';

const baseURL = process.env.BACK_URL;

export const instance = axios.create({
  baseURL,
});

/* NOTE: Default 양식

=========
import {instance} from './index';

const authPath = (path: string) => {
  return `/auth${path}`;
};

const authAPI = {
  isSignedUp: async (body: {code: string}) => {
		try {
			const url = authPath(`/isSignedUp`);
			const response = await instance.post(url, body);
			return response;
		} catch (e: any) {
			console.log(e.message);
		}
  },
}

*/

export {};
