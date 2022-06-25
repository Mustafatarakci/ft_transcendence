import axios from 'axios';

const baseURL = process.env.BACK_URL;

export const instance = axios.create({
  baseURL,
});

/* NOTE: Default 양식

=========
import axios from 'axios';
import instance from '.';

const authPath = path => {
  return `/auth${path}`;
};

const authAPI = {
  isSignedUp: async (body) => {
		try {
			const url = authPath(`/isSignedUp`);
			response = await instance.post(url, body);
			return response;
		} catch (e: Error) {
			console.log(e.message);
		}
  },
}

*/

export {};
