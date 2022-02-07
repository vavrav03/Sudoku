const gamesString = '/games';

export const routes = {
   classicEasy: `${gamesString}/classicEasy`,
   classicNormal: `${gamesString}/classicMedium`,
   classicHard: `${gamesString}/classicHard`,
   size2x2: `${gamesString}/size2x2`,
   size2x3: `${gamesString}/size2x3`,
   size4x4: `${gamesString}/size4x4`,
   diagonal: `${gamesString}/diagonal`,
   jigsaw: `${gamesString}/jigsaw`,
   samurai: `${gamesString}/samurai`,
   samuraiMixed: `${gamesString}/samuraiMixed`,
   home: '/',
   singIn: '/login',
   signUp: '/register',
   shop: '/shop',
   unfinishedGames: '/unfinishedGames',
   userProfile: '/userProfile',
};

export default routes;
