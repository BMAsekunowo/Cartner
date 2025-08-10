import axios from "axios";

const port = import.meta.env.BACKEND_URL || "http://localhost:5005";


export const createSession = async (sessionData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(`${port}/api/sessions`, sessionData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const inviteUser = async (inviteData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(`${port}/api/sessions/invite`, inviteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getSessionInvites = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${port}/api/sessions/myinvites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const acceptInvite = async (inviteData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(`${port}/api/sessions/accinvite`, inviteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const rejectInvite = async (inviteData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(`${port}/api/sessions/rejinvite`, inviteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const joinSessionByCode = async (joinData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(`${port}/api/sessions/join/code`, joinData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getJoinRequests = async (sessionCode) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(
    `${port}/api/sessions/joinrequests`,
    { sessionCode },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const approveJoinRequest = async (sessionCode, userId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(
    `${port}/api/sessions/approve/${sessionCode}`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const rejectJoinRequest = async (sessionCode, userId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.post(
    `${port}/api/sessions/reject/${sessionCode}`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const getAllSessions = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${port}/api/sessions/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getSessionById = async (sessionId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${port}/api/sessions/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getActiveSessionsByUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${port}/api/sessions/mysessions/actives`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getCartBySessionId = async (sessionId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${port}/api/sessions/${sessionId}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getSessionSummary = async (sessionId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${port}/api/sessions/${sessionId}/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const leaveSession = async (sessionId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.delete(`${port}/api/sessions/${sessionId}/leave`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const endSession = async (sessionId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.put(
    `${port}/api/sessions/${sessionId}/end`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const syncUserSessions = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${port}/api/sessions/sync`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
