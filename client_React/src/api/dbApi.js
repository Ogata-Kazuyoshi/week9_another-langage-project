import axiosClient from './axiosClient';

const dbApi = {
  getDB: () => axiosClient.get('data/'),
  getUserDB: (id) => axiosClient.get(`/data/${id}`),
  createNew: (params) => axiosClient.post(`data/`, params),
  update: (params, id) => axiosClient.put(`data/${id}`, params),
  delete: (id) => axiosClient.delete(`data/${id}`),
};

export default dbApi;
