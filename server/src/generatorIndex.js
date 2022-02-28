const path = require(`sexy-require`);
require('dotenv').config({ path: 'src/config/.env' });

const { makeDatabase } = require('/src/database');
const readline = require('readline');
const {
   generateClassicGame,
   generateClassicXGame,
   generateJigsawGame,
   generateSamuraiGame,
   generateSamuraiMixedGame,
} = require('/src/service/generators');
const { writeGrid } = require('/src/service/variationCreator');

const database = makeDatabase(process.env.DATABASE_URL);

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   terminal: false, //needed, because nodejs for some reason otherwise sends input directly to output
});

function ask(questionText) {
   return new Promise((resolve, reject) => {
      rl.question(questionText, (input) => resolve(input));
   });
}

class Game {
   constructor(name, sizes, saveToDBMethod, generateMethod) {
      this.name = name;
      this.sizes = sizes;
      this.saveToDBMethod = saveToDBMethod;
      this.generateMethod = generateMethod;
   }
}

const games = {
   classic: new Game(
      'Classic',
      [4, 6, 8, 9, 10, 12, 14, 16],
      database.saveClassicGame,
      generateClassicGame
   ),
   classicX: new Game(
      'ClassicX',
      [4, 6, 8, 9, 10, 12, 14, 16],
      database.saveClassicXGame,
      generateClassicXGame
   ),
   jigsaw: new Game(
      'Jigsaw',
      [4, 6, 8, 9, 10, 12, 14, 16],
      database.saveJigsawGame,
      generateJigsawGame
   ),
   samurai: new Game(
      'Samurai',
      [9, 12],
      database.saveSamuraiGame,
      generateSamuraiGame
   ),
   samuraiMixed: new Game(
      'Samurai mixed',
      [9, 12],
      database.saveSamuraiMixedGame,
      generateSamuraiMixedGame
   ),
};

const askForType = async () => {
   return await ask(
      `Which of these game types would you like to generate? Type only the number preceding name. Type only one!\n${Object.keys(
         games
      )
         .map((value, index) => {
            return `${index + 1}) ${games[value].name}\n`;
         })
         .join('')}`
   );
};

const askForSize = async (game) => {
   return await ask(
      `Select size of ${game.name}\n${game.sizes
         .map((value, index) => {
            return `${index + 1}) ${value}x${value}\n`;
         })
         .join('')}`
   );
};

const askForDifficulty = async (gameType) => {
   return await ask(
      `Select difficulty of ${gameType}\n` +
         '1) easy\n' +
         '2) normal\n' +
         '3) hard\n'
   );
};

const askForCount = async (gameType, size, difficulty) => {
   return await ask(
      `How many games of type ${gameType} with size ${size}x${size} and difficulty ${difficulty} (1-200)\n`
   );
};

const startSavingToDb = async (
   selectedGame,
   selectedSize,
   selectedDifficulty,
   count
) => {
   for (let i = 0; i < count; i++) {
      await selectedGame.saveToDBMethod(
         selectedGame.generateMethod(selectedSize, selectedDifficulty)
      );
      console.log(`${i + 1}. sudoku generated and stored`);
   }
};

const startDialogue = async () => {
   // const game = generateClassicGame('hard');
   while (true) {
      let gameNumber;
      while (true) {
         gameNumber = parseInt(await askForType());
         if (gameNumber >= 1 && gameNumber <= Object.keys(games).length) {
            break;
         }
      }
      let selectedGame = games[Object.keys(games)[gameNumber - 1]];
      let selectedSize;
      while (true) {
         selectedSize = parseInt(await askForSize(selectedGame));
         if (gameNumber >= 1 && gameNumber <= selectedGame.sizes.length) {
            selectedSize = selectedGame.sizes[selectedSize - 1];
            break;
         }
      }
      let selectedDifficulty;
      while (true) {
         selectedDifficulty = parseInt(
            await askForDifficulty(selectedGame.name)
         );
         if (gameNumber >= 1 && gameNumber <= 3) {
            switch (selectedDifficulty) {
               case 1:
                  selectedDifficulty = 'easy';
                  break;
               case 2:
                  selectedDifficulty = 'normal';
                  break;
               case 3:
                  selectedDifficulty = 'hard';
                  break;
            }
            break;
         }
      }
      let count;
      while (true) {
         count = parseInt(
            await askForCount(
               selectedGame.name,
               selectedSize,
               selectedDifficulty
            )
         );
         if (count >= 1 && count <= 200) {
            break;
         }
      }
      startSavingToDb(selectedGame, selectedSize, selectedDifficulty, count);
   }
};
startDialogue();
