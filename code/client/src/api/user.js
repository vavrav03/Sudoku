import axios from './client';

export const getUser = () => axios.get('/user');
export const postRegister = (user) => axios.post('/auth/register', user);
export const postLogin = (user) => axios.post('/auth/login', user);
export const postLogout = () => axios.post('/auth/logout');
export const earnCoins = (coinsCount) => axios.post('/user/earnCoins', {coinsCount});
export const saveUnfinishedGame = (game) => axios.post('/user/unfinishedGames', game);
export const deleteUnfinishedGame = (game) => axios.delete(`/user/unfinishedGames/${game.created_at}`);