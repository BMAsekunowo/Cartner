import axios from 'axios';

const port = 'http://localhost:5005';


export const createSession = async (sessionData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");

    const res = await axios.post(`${port}/api/sessions`, sessionData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const getAllSessions = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");

    const res = await axios.get(`${port}/api/sessions/my`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}