import axios from 'axios';

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default (baseURL) => {   
  const instance = axios.create({
    baseURL,
    ...commonConfig,
  });

  return instance;
};
