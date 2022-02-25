export const buildMakeUser = () => {
   const makeUser = ({
      firstName,
      lastName,
      email,
      coinsCount = 0,
      profilePictureLink = null,
   } = {}) => {
      if (!firstName) {
         throw Error('First name must be defined');
      }
      if (!lastName) {
         throw Error('Last name must be defined');
      }
      if (!email) {
         throw Error('Email must be defined');
      }
      return Object.freeze({
         getFirstName: () => firstName,
         getLastName: () => lastName,
         getFullName: () => `${firstName} ${lastName}`,
         getInitials: () =>
            `${this.first_name[0].concat(this.last_name[0]).toUpperCase()}`,
         getEmail: () => email,
         getCoinsCount: () => coinsCount,
         getProfilePictureLink: () => profilePictureLink,
      });
   };
   return makeUser;
};
