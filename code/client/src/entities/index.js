import _ from 'lodash';
import {buildMakeGames} from './games';
import {buildMakeUser} from './user';
const makeUser = buildMakeUser()
const makeGames = buildMakeGames(_.cloneDeep);
const combined = { ...makeGames, makeUser}

export default combined;