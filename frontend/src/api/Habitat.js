import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

const HabitatApi = {
    // 获取所有栖息地
    getAllHabitats: () => {
        return axios.get(`${BASE_URL}habitats/`);
    },


    // 创建新栖息地
    createHabitat: (newHabitatData) => {
        return axios.post(`${BASE_URL}habitats/`, newHabitatData);
    },

    // 删除栖息地
    deleteHabitat: (habitatId) => {
        return axios.delete(`${BASE_URL}habitats/${habitatId}/`);
    },

    // 更新栖息地信息
    updateHabitat: (habitatId, updatedHabitatData) => {
        return axios.put(`${BASE_URL}habitats/${habitatId}/`, updatedHabitatData);
    }
};

export default HabitatApi;

