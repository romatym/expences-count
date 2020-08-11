import queryString from "querystring";

export const API_URL = "//data.fixer.io/api/latest";
export const API_KEY = "8d26248b1c5d84fdfef651056a7d1e5a";

export const fetchApi = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.status !== 200) {
      //return Promise.reject(new Error(response.statusText))
      //throw await response.json()
      throw response.statusText;
    }

    return await response.json();
    
  } catch (err) {
    return err;
  }
};

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      access_key: API_KEY,
      ...params,
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {}
    );
  }
}
