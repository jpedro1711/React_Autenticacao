import React from 'react';
import axios from 'axios';
const HttpService = () => {
  async function Post(url, data) {
    const res = await axios.post(url, data);
    return res;
  }

  async function Get(url) {
    const res = await axios.get(url);
    return res;
  }

  return {
    Get: (url) => Get(url),
    Post: (url, data) => Post(url, data),
  };
};

export default HttpService;
