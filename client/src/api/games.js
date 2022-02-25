import axios from './client';
export const getClassicGame = (difficulty) =>
   axios.get('/games/classic', {params: { difficulty }});
export const getClassicResizedGame = (size) =>
   axios.get('/games/classicResized', {params: { size }});
export const getClassicXGame = (size) => axios.get('/games/classicX', {params: { size }});
export const getJigsawGame = (size) => axios.get('/games/jigsaw', {params: { size }});
export const getSamuraiGame = (size) => axios.get('/games/samurai', {params: { size }});
export const getSamuraiMixedGame = (size) =>
   axios.get('/games/samuraiMixed', {params: { size }});
