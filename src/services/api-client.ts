import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '49210ae6f6a64c5d8ed480273d79b26b',
  },
});
