import axios from './client';
export const getClassicGame = (size, difficulty) =>
   axios.get('/games/classic', {params: { size, difficulty }});
export const getClassicXGame = (size, difficulty) => axios.get('/games/classicX', {params: { size, difficulty }});
export const getJigsawGame = (size, difficulty) => axios.get('/games/jigsaw', {params: { size, difficulty }});
export const getSamuraiGame = (size, difficulty) => axios.get('/games/samurai', {params: { size, difficulty }});
export const getSamuraiMixedGame = (size, difficulty) =>
   axios.get('/games/samuraiMixed', {params: { size, difficulty }});
