const buildMakeUser = (validator, createHash) => {
   const makeUser = ({
      firstName,
      first_name,
      lastName,
      last_name = "",
      email,
      coins_count,
      coinsCount = 0,
      profilePictureLink = null,
      profile_picture_link,
      auth,
      bought_items,
      boughtItems = [],
      unfinished_games,
      unfinishedGames = [],
   } = {}) => {
      firstName = first_name ? first_name : firstName;
      lastName = last_name ? last_name : lastName;
      profilePictureLink = profile_picture_link ? profile_picture_link : profilePictureLink; // make user from database data
      coinsCount = coins_count ? coins_count : coinsCount;
      boughtItems = bought_items ? bought_items : boughtItems;
      unfinishedGames = unfinished_games ? unfinished_games : unfinishedGames;
      if (!firstName) {
         throw Error('First name must be defined');
      }
      if (!email) {
         throw Error('Email must be defined');
      }
      if (!validator.isEmail(email)) {
         throw Error('Given string is not an email address');
      }
      if (!auth || (!auth.local && !auth.google && !auth.facebook)) {
         throw Error('At least 1 authentication mechanism must be specified');
      }
      return Object.freeze({
         getFirstName: () => firstName,
         getLastName: () => lastName,
         getFullName: () => `${firstName} ${lastName}`,
         getInitials: () =>
            `${this.first_name[0].concat(this.last_name[0]).toUpperCase()}`,
         getEmail: () => email,
         getCoinsCount: () => coinsCount,
         setCoinsCount: (newCoinsCount) => {
            coinsCount = newCoinsCount;
         },
         getProfilePictureLink: () => profilePictureLink,
         getAuthData: () => auth,
         getPasswordHash: () => auth?.local?.passwordHash,
         attemptPasswordChange: async (oldPassword, newPassword) => {
            const oldPasswordHash = await createHash(oldPassword);
            if(oldPasswordHash !== auth?.local?.passwordHash){
               throw Error('Old password and new password do not match')
            }
            if(!validator.isStrongPassword(newPassword)){
               throw Error('Password is not strong enough')
            }
            auth.local.passwordHash = await createHash(newPassword);
            return true;
         },
         isPasswordCorrect: async (password) => {
            const passwordHash = await createHash(password);
            return passwordHash === auth?.local?.passwordHash;
         },
         getGoogleAuthData: () => Object.freeze(auth?.google),
         getFacebookAuthData: () => Object.freeze(auth?.facebook),
         setGoogleData: (id, accessToken) => {
            auth.google = {
               id, accessToken
            }
         },
         setFacebookData: (id, accessToken) => {
            auth.facebook = {
               id, accessToken
            }
         },
         getBoughtItems: () => boughtItems,
         getUnfinishedGames: () => unfinishedGames,
         addBoughtItem: (name, count) => {
            const itemInUserInventory= boughtItems.find(i => i.name === name);
            if(itemInUserInventory){
               itemInUserInventory.count += count;
            } else {
               boughtItems.push({name, count});
            }
         },
         addUnfinishedGame: (game) => {
            unfinishedGames.push(game);
         },
         removeUnfinishedGame: (created_at) => {
            unfinishedGames = unfinishedGames.filter(g => g.created_at !== created_at);
         },
         changeUnfinishedGame: (created_at, game) => {
            for(let i = 0; i < unfinishedGames.length; i++){
               if(unfinishedGames[i].created_at === created_at){
                  unfinishedGames[i] = game;
                  break;
               }
            }
         },
         removeBoughtItem: (name) => {
            const boughtItem = boughtItems.find(i => i.name === name);
            if(boughtItem.count > 1){
               boughtItem.count--;
            } else {
               boughtItems = boughtItems.filter(i => i.name !== name);
            }
         },
         toAPIObject: () => {
            return {
               email,
               firstName,
               lastName, 
               fullName: `${firstName} ${lastName}`,
               profilePictureLink,
               coinsCount,
               boughtItems,
               unfinishedGames,
            }
         }
      });
   };
   return makeUser;
};

module.exports = {
   buildMakeUser,
};
