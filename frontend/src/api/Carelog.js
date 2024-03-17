import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

const CarelogApi = {
  // 获取所有 Carelog
  getAllCarelogs: () => {
    return axios.get(`${BASE_URL}carelogs/`);
  },

  // 创建新的 Carelog
  createCarelog: (newCarelogData) => {
    return axios.post(`${BASE_URL}carelogs/`, newCarelogData);
  },

  // 删除 Carelog
  deleteCarelog: (carelogId) => {
    return axios.delete(`${BASE_URL}carelogs/${carelogId}/`);
  },

  // 更新 Carelog 信息
  updateCarelog: (carelogId, updatedCarelogData) => {
    return axios.put(`${BASE_URL}carelogs/${carelogId}/`, updatedCarelogData);
  }
};

export default CarelogApi;


