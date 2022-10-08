import axios from 'axios';

const instance = axios.create({
    baseURL:
      (process.env.NEXT_PUBLIC_SITE_SECURE === "true" ? `https://` : `http://`) +
      process.env.NEXT_PUBLIC_SITE_URL + `/api`,
  });

export default instance;