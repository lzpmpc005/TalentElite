import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/members/';

const MemberApi = {
    // 获取所有成员
    getMembers: () => {
        return axios.get(BASE_URL);
    },

    // 创建新成员
    createMember: (memberData) => {
        return axios.post(BASE_URL, memberData);
    },

    // 删除成员
    deleteMember: (memberId) => {
        return axios.delete(`${BASE_URL}${memberId}/`);
    },

    // 更新成员信息
    updateMember: (memberId, updatedMemberData) => {
        return axios.put(`${BASE_URL}${memberId}/`, updatedMemberData);
    }
};

export default MemberApi;
