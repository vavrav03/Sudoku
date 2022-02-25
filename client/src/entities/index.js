import {buildMakeGames} from './games';
import {buildMakeUser} from './user';
const makeUser = buildMakeUser()
const makeGames = buildMakeGames();
const combined = { ...makeGames, makeUser}

export default combined;