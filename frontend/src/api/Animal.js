import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

const Animal = {
    // 获取所有动物
    getAllAnimals: () => {
        return axios.get(`${BASE_URL}animals/`);
    },

    // 创建新动物
    createAnimal: (newAnimalData) => {
        return axios.post(`${BASE_URL}animals/`, newAnimalData);
    },

    // 删除动物
    deleteAnimal: (animalId) => {
        return axios.delete(`${BASE_URL}animals/${animalId}/`);
    },

    // 更新动物信息
    updateAnimal: (animalId, updatedAnimalData) => {
        return axios.put(`${BASE_URL}animals/${animalId}/`, updatedAnimalData);
    }
};

export default Animal;
