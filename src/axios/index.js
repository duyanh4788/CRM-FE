import axios from "axios";
const axiosFetch = (url, method, data) => {
  return axios({
    url: url,
    method: method,
    data: data,
  });
};

export default axiosFetch;
