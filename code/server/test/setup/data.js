const {
   makeClassicGame,
   makeClassicXGame,
   makeJigsawGame,
   makeShopItem,
} = require('/src/entities');
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
   makeClassicGame({
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
      solutions: [
         [
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
      ],
      difficulty: 'normal',
   }),
   makeClassicGame({
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
      solutions: [
         [
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
      ],
      difficulty: 'easy',
   }),
   makeClassicGame({
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
      solutions: [
         [
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
      ],
      difficulty: 'hard',
   }),
];

const unsolvable4x4Game = makeClassicGame({
   seed: [
      [1, -1, -1, 4],
      [-1, 4, -1, -1],
      [-1, -1, 3, -1],
      [4, -1, -1, 1],
   ],
   solutions: [],
   difficulty: 'normal',
});

const classic4x4 = [
   makeClassicGame({
      seed: [
         [1, -1, -1, 3],
         [-1, 4, -1, -1],
         [-1, -1, 3, -1],
         [4, -1, -1, 1],
      ],
      solutions: [
         [
            [1, 2, 4, 3],
            [3, 4, 1, 2],
            [2, 1, 3, 4],
            [4, 3, 2, 1],
         ],
      ],
      difficulty: 'normal',
   }),
];

const classic6x6 = [
   makeClassicGame({
      seed: [
         [-1, 5, -1, -1, -1, -1],
         [2, -1, -1, 5, 1, -1],
         [-1, -1, 2, 6, -1, -1],
         [-1, -1, 4, 2, -1, -1],
         [-1, 6, 3, -1, -1, 5],
         [-1, -1, -1, -1, 4, -1],
      ],
      solutions: [
         [
            [3, 5, 1, 4, 6, 2],
            [2, 4, 6, 5, 1, 3],
            [5, 1, 2, 6, 3, 4],
            [6, 3, 4, 2, 5, 1],
            [4, 6, 3, 1, 2, 5],
            [1, 2, 5, 3, 4, 6],
         ],
      ],
      difficulty: 'normal',
   }),
];

const ambiguousClassicSolution = makeClassicGame({
   difficulty: 'normal',
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
   solutions: [
      [
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
      [
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
   ],
   difficulty: 'normal',
});

const jigsaw9x9 = [
   makeJigsawGame({
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
      solutions: [
         [
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
      difficulty: 'normal',
   }),
];

const classicXGames = [
   makeClassicXGame({
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
      solutions: [
         [
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
      ],
      difficulty: 'normal',
   }),
];

const shopData = [
   makeShopItem({
      name: 'Jigsaw Hard 9x9 board',
      description: 'A 9x9 board with pieces.',
      price: 100,
      imageLink: null,
   }),
   makeShopItem({
      name: 'Hard Jigsaw 9x9 board',
      description: 'A 9x9 board with.',
      price: 120,
      imageLink: null,
   }),
   makeShopItem({
      name: 'Third item',
      description: 'An extremely long description that will definitely not fit into one row and therefore it will have to be spanned across multiple rows.',
      price: 1200,
      imageLink: null,
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
   unsolvable4x4Game,
   classic4x4,
   classic6x6,
   ambiguousClassicSolution,
   jigsaw9x9,
   classicXGames,
   shopData,
};
