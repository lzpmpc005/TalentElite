import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

const TourScheduleApi = {
    // 获取所有游览路线
    getAllTourSchedules: () => {
        return axios.get(`${BASE_URL}tour_schedules/`);
    },

    // 创建新的游览路线
    createTourSchedule: (newTourScheduleData) => {
        return axios.post(`${BASE_URL}tour_schedules/`, newTourScheduleData);
    },

    // 删除游览路线
    deleteTourSchedule: (tourScheduleId) => {
        return axios.delete(`${BASE_URL}tour_schedules/${tourScheduleId}/`);
    },

    // 更新游览路线信息
    updateTourSchedule: (tourScheduleId, updatedTourScheduleData) => {
        return axios.put(`${BASE_URL}tour_schedules/${tourScheduleId}/`, updatedTourScheduleData);
    }
};

export default TourScheduleApi;
