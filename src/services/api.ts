import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

export const login = async (email: string, password: string) => {
  try {
    const data = { email, password };
    const response = await api.post("user/login", data);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.status;
  }
};

export const getCompany = async () =>
  await api
    .get("company/")
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const createSector = async (data: any) =>
  await api
    .post("sector/", data)
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const createTeam = async (data: any) =>
  await api
    .post("team/", data)
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const getSectors = async () =>
  await api
    .get("sector/")
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const insertUser = async (data: any) =>
  await api
    .post("user/", data)
    .then((res) => res)
    .catch((err) => console.log(err));

export const getCategories = async () => {
  return await api
    .get("category/")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getGoals = async (userId: string) => {
  try {
    const response = await api.get(`goals/${userId}`);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.status;
  }
};

export const getImprovements = async (userId: string) => {
  try {
    const response = await api.get(`improve/${userId}`);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.status;
  }
};

export const getSendingFeedbacks = async (userId: string) => {
  try {
    const send = await api.get(`/feedbacks/send/${userId}`);
    return send.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.status;
  }
};

export const getRecievedFeedbacks = async (userId: string) => {
  try {
    const send = await api.get(`/feedbacks/recieve/${userId}`);
    return send.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.status;
  }
};

export const createGoal = async (userGoalsData: object) => {
  try {
    const response = await api.post(`goal/`, userGoalsData);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.status;
  }
};

export const createFeedback = async (userFeedbackData: object) => {
  try {
    const response = await api.post(`feedback/`, userFeedbackData);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.status;
  }
};

export const createImprovements = async (userImprovementsData: object) => {
  try {
    const response = await api.post(`improvements/`, userImprovementsData);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.status;
  }
};

export const listTeams = async (teamId: string) => {
  try {
    const response = await api.get(`teams/in/${teamId}`);
    return response.data;
  } catch (err: any) {
    console.log(err);
    return err?.response?.status;
  }
};

export const getTeams = async () =>
  await api
    .get("team/")
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const getManangers = async () =>
  await api
    .get("user/manangers")
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const getUsers = async () =>
  await api
    .get("user/categories/")
    .then((res) => res.data)
    .catch((err) => console.log(err));

export const excludeUser = async (id: string) =>
  await api.delete(`user/${id}`).catch((err) => console.log(err));
