import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

const ZookeeperApi = {
    // 获取所有动物管理员
    getAllZookeepers: () => {
        return axios.get(`${BASE_URL}zookeepers/`);
    },

    // 创建新的动物管理员
    createZookeeper: (newZookeeperData) => {
        return axios.post(`${BASE_URL}zookeepers/`, newZookeeperData);
    },

    // 删除动物管理员
    deleteZookeeper: (zookeeperId) => {
        return axios.delete(`${BASE_URL}zookeepers/${zookeeperId}/`);
    },

    // 更新动物管理员信息
    updateZookeeper: (zookeeperId, updatedZookeeperData) => {
        return axios.put(`${BASE_URL}zookeepers/${zookeeperId}/`, updatedZookeeperData);
    }
};

export default ZookeeperApi;
