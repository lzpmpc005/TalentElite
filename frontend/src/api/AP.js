import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/activityparticipants/';

const ActivityParticipantApi = {
    // 获取所有活动参与者
    getAllActivityParticipants: () => {
        return axios.get(BASE_URL);
    },

    // 创建新的活动参与者
    createActivityParticipant: (newParticipantData) => {
        return axios.post(BASE_URL, newParticipantData);
    },

    // 删除活动参与者
    deleteActivityParticipant: (participantId) => {
        return axios.delete(`${BASE_URL}${participantId}/`);
    },

    // 更新活动参与者信息
    updateActivityParticipant: (participantId, updatedParticipantData) => {
        return axios.put(`${BASE_URL}${participantId}/`, updatedParticipantData);
    }
};

export default ActivityParticipantApi;
