import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export const getStudents = () => axios.get(`${API_BASE}/students`);
export const getStudentById = (id) => axios.get(`${API_BASE}/students/${id}`);
export const createStudent = (data) => axios.post(`${API_BASE}/students`, data);
export const updateStudent = (id, data) => axios.put(`${API_BASE}/students/${id}`, data);
export const searchStudents = (skill) => axios.get(`${API_BASE}/students/search?skill=${skill}`);

export const getCompanies = () => axios.get(`${API_BASE}/companies`);
export const createCompany = (data) => axios.post(`${API_BASE}/companies`, data);

export const getProjects = () => axios.get(`${API_BASE}/projects`);
export const createProject = (data) => axios.post(`${API_BASE}/projects`, data);

export const getExperiences = () => axios.get(`${API_BASE}/experiences`);
export const createExperience = (data) => axios.post(`${API_BASE}/experiences`, data);