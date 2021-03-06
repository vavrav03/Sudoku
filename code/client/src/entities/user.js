export const buildMakeUser = () => {
   const makeUser = ({
      firstName,
      lastName = "",
      email,
      coinsCount = 0,
      profilePictureLink = null,
      boughtItems,
      unfinishedGames,
   } = {}) => {
      if (!firstName) {
         throw Error('First name must be defined');
      }
      if (!email) {
         throw Error('Email must be defined');
      }
      return Object.freeze({
         firstName,
         lastName,
         fullName: `${firstName} ${lastName}`,
         email,
         coinsCount,
         profilePictureLink,
         boughtItems,
         unfinishedGames,
      });
   };
   return makeUser;
};
