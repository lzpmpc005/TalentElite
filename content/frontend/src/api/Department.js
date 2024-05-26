import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

const DepartmentApi = {
    // 获取所有部门
    getAllDepartments: () => {
        return axios.get(`${BASE_URL}departments/`);
    },

    // 创建新部门
    createDepartment: (newDepartmentData) => {
        return axios.post(`${BASE_URL}departments/`, newDepartmentData);
    },

    // 删除部门
    deleteDepartment: (departmentId) => {
        return axios.delete(`${BASE_URL}departments/${departmentId}/`);
    },

    // 更新部门信息
    updateDepartment: (departmentId, updatedDepartmentData) => {
        return axios.put(`${BASE_URL}departments/${departmentId}/`, updatedDepartmentData);
    }
};

export default DepartmentApi;

