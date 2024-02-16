import React, { useState } from 'react';
import axios from 'axios';
const HttpService = () => {
  const [token, setToken] = useState(null);

  const getToken = () => {
    localStorage.getItem('token');
  };
  let config = {
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  };

  async function Post(url, data) {
    const res = await axios.post(url, data);
    return res;
  }

  async function Get(url) {
    const res = await axios.get(url, config);
    return res;
  }

  return {
    Get: (url) => Get(url),
    Post: (url, data) => Post(url, data),
  };
};

export default HttpService;
