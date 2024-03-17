import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/activities/';

const ActivityApi = {
    // 获取所有活动
    getAllActivities: () => {
        return axios.get(BASE_URL);
    },

    // 创建新活动
    createActivity: (newActivityData) => {
        return axios.post(BASE_URL, newActivityData);
    },

    // 删除活动
    deleteActivity: (activityId) => {
        return axios.delete(`${BASE_URL}${activityId}/`);
    },

    // 更新活动信息
    updateActivity: (activityId, updatedActivityData) => {
        return axios.put(`${BASE_URL}${activityId}/`, updatedActivityData);
    }
};

export default ActivityApi;
