import queryString from "querystring";

export const API_URL = "//data.fixer.io/api/latest";
export const API_KEY = "8d26248b1c5d84fdfef651056a7d1e5a";

export const fetchApi = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (response.status < 400) {
      return await response.json();
    } else {
      throw response;
    }
  } catch (err) {
      return await err.json();
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

// export const fetchApi = (url, options = {}) => {
//   return new Promise((resolve, reject) => {
//     fetch(url, options)
//       .then((response) => {
//         if (response.status < 400) {
//           return response.json();
//         } else {
//           throw response;
//         }
//       })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((response) => {
//         response.json().then((error) => {
//           reject(error);
//         });
//       });
//   });
// };
