import axiosClient from './axiosClient';

const dbApi = {
  getDB: () => axiosClient.get('data/'),
  getSingleDB: (id) => axiosClient.get(`/data/${id}`),
};

export default dbApi;
