const {
   ClassicGame,
   ClassicResizedGame,
   ClassicXGame,
   JigsawGame,
   SamuraiGame,
   SamuraiMixedGame,
} = require('../../src/database/models');
const { makeUser } = require('/src/entities');
const { createHash } = require('/src/service/passwordManager');

const user1WithoutPassword = makeUser({
   email: 'jmeno@gmail.com',
   firstName: 'firstName',
   lastName: 'lastName',
   auth: { google: { id: '' } },
});

const user1Password = 'StrongPassword123*';
const user1NewPassword = 'StrongPassword123*New';

const user1RegisterRequestData = {
   email: user1WithoutPassword.getEmail(),
   firstName: user1WithoutPassword.getFirstName(),
   lastName: user1WithoutPassword.getLastName(),
   password: user1Password,
};

const user1LoginRequestData = {
   email: user1WithoutPassword.getEmail(),
   password: user1Password,
};

const createUserWithPassword = async () => {
   return makeUser({
      email: user1WithoutPassword.getEmail(),
      firstName: user1WithoutPassword.getFirstName(),
      lastName: user1WithoutPassword.getLastName(),
      auth: {
         google: { id: '' },
         local: {
            passwordHash: await createHash(user1Password),
         },
      },
   });
};

const classicGames = [
   new ClassicGame({
      seed: [
         [5, 3, -1, -1, 7, -1, -1, -1, -1],
         [6, -1, -1, 1, 9, 5, -1, -1, -1],
         [-1, 9, 8, -1, -1, -1, -1, 6, -1],
         [8, -1, -1, -1, 6, -1, -1, -1, 3],
         [4, -1, -1, 8, -1, 3, -1, -1, 1],
         [7, -1, -1, -1, 2, -1, -1, -1, 6],
         [-1, 6, -1, -1, -1, -1, 2, 8, -1],
         [-1, -1, -1, 4, 1, 9, -1, -1, 5],
         [-1, -1, -1, -1, 8, -1, -1, 7, 9],
      ],
      solution: [
         [5, 3, 4, 6, 7, 8, 9, 1, 2],
         [6, 7, 2, 1, 9, 5, 3, 4, 8],
         [1, 9, 8, 3, 4, 2, 5, 6, 7],
         [8, 5, 9, 7, 6, 1, 4, 2, 3],
         [4, 2, 6, 8, 5, 3, 7, 9, 1],
         [7, 1, 3, 9, 2, 4, 8, 5, 6],
         [9, 6, 1, 5, 3, 7, 2, 8, 4],
         [2, 8, 7, 4, 1, 9, 6, 3, 5],
         [3, 4, 5, 2, 8, 6, 1, 7, 9],
      ],
      difficulty: 'normal',
   }),
];

const unsolvable4x4Seed = [
   [1, -1, -1, 4],
   [-1, 4, -1, -1],
   [-1, -1, 3, -1],
   [4, -1, -1, 1],
];

const classic4x4 = [
   new ClassicResizedGame({
      seed: [
         [1, -1, -1, 3],
         [-1, 4, -1, -1],
         [-1, -1, 3, -1],
         [4, -1, -1, 1],
      ],
      solution: [
         [1, 2, 4, 3],
         [3, 4, 1, 2],
         [2, 1, 3, 4],
         [4, 3, 2, 1],
      ],
   }),
];

const classic6x6 = [
   new ClassicResizedGame({
      seed: [
         [-1, 5, -1, -1, -1, -1],
         [2, -1, -1, 5, 1, -1],
         [-1, -1, 2, 6, -1, -1],
         [-1, -1, 4, 2, -1, -1],
         [-1, 6, 3, -1, -1, 5],
         [-1, -1, -1, -1, 4, -1],
      ],
      solution: [
         [3, 5, 1, 4, 6, 2],
         [2, 4, 6, 5, 1, 3],
         [5, 1, 2, 6, 3, 4],
         [6, 3, 4, 2, 5, 1],
         [4, 6, 3, 1, 2, 5],
         [1, 2, 5, 3, 4, 6],
      ],
   }),
];

const ambiguousClassicSolution = {
   seed: [
      [9, -1, 6, -1, 7, -1, 4, -1, 3],
      [-1, -1, -1, 4, -1, -1, 2, -1, -1],
      [-1, 7, -1, -1, 2, 3, -1, 1, -1],
      [5, -1, -1, -1, -1, -1, 1, -1, -1],
      [-1, 4, -1, 2, -1, 8, -1, 6, -1],
      [-1, -1, 3, -1, -1, -1, -1, -1, 5],
      [-1, 3, -1, 7, -1, -1, -1, 5, -1],
      [-1, -1, 7, -1, -1, 5, -1, -1, -1],
      [4, -1, 5, -1, 1, -1, 7, -1, 8],
   ],
   solution1: [
      [9, 2, 6, 5, 7, 1, 4, 8, 3],
      [3, 5, 1, 4, 8, 6, 2, 7, 9],
      [8, 7, 4, 9, 2, 3, 5, 1, 6],
      [5, 8, 2, 3, 6, 7, 1, 9, 4],
      [1, 4, 9, 2, 5, 8, 3, 6, 7],
      [7, 6, 3, 1, 4, 9, 8, 2, 5],
      [2, 3, 8, 7, 9, 4, 6, 5, 1],
      [6, 1, 7, 8, 3, 5, 9, 4, 2],
      [4, 9, 5, 6, 1, 2, 7, 3, 8],
   ],
   solution2: [
      [9, 2, 6, 5, 7, 1, 4, 8, 3],
      [3, 5, 1, 4, 8, 6, 2, 7, 9],
      [8, 7, 4, 9, 2, 3, 5, 1, 6],
      [5, 8, 2, 3, 6, 7, 1, 9, 4],
      [1, 4, 9, 2, 5, 8, 3, 6, 7],
      [7, 6, 3, 1, 9, 4, 8, 2, 5],
      [2, 3, 8, 7, 4, 9, 6, 5, 1],
      [6, 1, 7, 8, 3, 5, 9, 4, 2],
      [4, 9, 5, 6, 1, 2, 7, 3, 8],
   ],
};

const jigsaw9x9 = [
   new JigsawGame({
      seed: [
         [2, -1, -1, -1, -1, 6, -1, -1, -1],
         [9, -1, -1, 4, -1, -1, -1, 2, -1],
         [-1, -1, -1, -1, -1, 5, -1, -1, -1],
         [5, -1, -1, -1, 9, -1, -1, 8, -1],
         [6, -1, 3, -1, -1, -1, 9, -1, 2],
         [-1, 1, -1, -1, 2, -1, -1, -1, 3],
         [-1, -1, -1, 3, -1, -1, -1, -1, -1],
         [-1, 9, -1, -1, -1, 4, -1, -1, 8],
         [-1, -1, -1, 7, -1, -1, -1, -1, 4],
      ],
      solution: [
         [2, 8, 9, 1, 3, 6, 7, 4, 5],
         [9, 7, 5, 4, 8, 3, 1, 2, 6],
         [3, 2, 8, 9, 7, 5, 4, 6, 1],
         [5, 4, 1, 6, 9, 2, 3, 8, 7],
         [6, 5, 3, 8, 4, 1, 9, 7, 2],
         [8, 1, 4, 5, 2, 7, 6, 9, 3],
         [4, 6, 7, 3, 5, 8, 2, 1, 9],
         [7, 9, 6, 2, 1, 4, 5, 3, 8],
         [1, 3, 2, 7, 6, 9, 8, 5, 4],
      ],
      areaPointersGrid: [
         [0, 0, 0, 0, 0, 0, 0, 1, 1],
         [2, 2, 0, 0, 3, 3, 3, 3, 1],
         [2, 2, 2, 3, 3, 3, 3, 4, 1],
         [2, 2, 2, 3, 5, 5, 6, 4, 1],
         [2, 5, 5, 5, 5, 6, 6, 4, 1],
         [7, 5, 6, 6, 6, 6, 6, 4, 1],
         [7, 5, 5, 7, 7, 6, 4, 4, 1],
         [7, 7, 7, 7, 8, 4, 4, 4, 1],
         [7, 8, 8, 8, 8, 8, 8, 8, 8],
      ],
   }),
];

const classicXGames = [
   new ClassicXGame({
      seed: [
         [-1, -1, -1, -1, -1, 2, -1, -1, 6],
         [-1, 1, -1, 9, 3, -1, 2, -1, -1],
         [-1, -1, -1, -1, 7, -1, -1, 3, -1],
         [-1, 4, -1, 7, -1, -1, -1, -1, 8],
         [-1, 6, 5, -1, -1, -1, 7, 4, -1],
         [8, -1, -1, -1, -1, 3, -1, 5, -1],
         [-1, 5, -1, -1, 2, -1, -1, -1, -1],
         [-1, -1, 2, -1, 5, 4, -1, 6, -1],
         [4, -1, -1, 3, -1, -1, -1, -1, -1],
      ],
      solution: [
         [5, 3, 7, 4, 1, 2, 8, 9, 6],
         [6, 1, 4, 9, 3, 8, 2, 7, 5],
         [9, 2, 8, 5, 7, 6, 1, 3, 4],
         [3, 4, 1, 7, 6, 5, 9, 2, 8],
         [2, 6, 5, 8, 9, 1, 7, 4, 3],
         [8, 7, 9, 2, 4, 3, 6, 5, 1],
         [1, 5, 3, 6, 2, 9, 4, 8, 7],
         [7, 8, 2, 1, 5, 4, 3, 6, 9],
         [4, 9, 6, 3, 8, 7, 5, 1, 2],
      ],
   }),
];

module.exports = {
   user1WithoutPassword,
   user1Password,
   user1NewPassword,
   createUserWithPassword,
   user1RegisterRequestData,
   user1LoginRequestData,
   classicGames,
   unsolvable4x4Seed,
   classic4x4,
   classic6x6,
   ambiguousClassicSolution,
   jigsaw9x9,
   classicXGames,
};
