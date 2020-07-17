import queryString from "querystring";

export const API_URL = "https://data.fixer.io/api/latest";
export const API_KEY = "8d26248b1c5d84fdfef651056a7d1e5a";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => {
        response.json().then(error => {
          reject(error);
        });
      });
  });
};
export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      access_key: API_KEY,
      ...params
    };

    return fetchApi(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        // mode: "cors",
        // headers: {
        //   "Content-type": "application/json",
        // },
      }
    );
  }

  static post(url, options) {
    const { params = {}, body } = options;
    const queryStringParams = {
      api_key: API_KEY,
      ...params
    };

    return fetchApi(`${API_URL}${url}?${queryString.stringify(
      queryStringParams
    )}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body)
      }
    );

  }

  static delete(url, options) {
    const { params = {}, body } = options;
    const queryStringParams = {
      api_key: API_KEY,
      ...params
    };

    return fetchApi(`${API_URL}${url}?${queryString.stringify(
      queryStringParams
    )}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body)
      }
    );
  }

}