import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

const EmployeeApi = {
    getAllEmployees: () => {
        return axios.get(`${BASE_URL}employees/`);
    },

    createEmployee: (newEmployeeData) => {
        return axios.post(`${BASE_URL}employees/`, newEmployeeData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    deleteEmployee: (employeeId) => {
        return axios.delete(`${BASE_URL}employees/${employeeId}/`);
    },

    updateEmployee: (employeeId, updatedEmployeeData) => {
        return axios.put(`${BASE_URL}employees/${employeeId}/`, updatedEmployeeData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};

export default EmployeeApi;
