import axios from 'axios';
import { authAPI } from './auth';

// const url = 'http://ec2-15-164-215-143.ap-northeast-2.compute.amazonaws.com:5500';
const url = process.env.REACT_APP_BACK_API;

export const instance = axios.create({
  baseURL: url,
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

export { authAPI };
