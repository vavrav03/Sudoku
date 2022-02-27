const path = require(`sexy-require`);
require('dotenv').config({ path: 'src/config/.env' });

const { makeDatabase } = require('/src/database');
const readline = require('readline');

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
   constructor(name, subtypes, subtypeFormatFunction) {
      this.name = name;
      this.subtypes = subtypes;
      this.subtypeFormatFunction = subtypeFormatFunction;
   }
}

const classicSubtypeFormat = (subtype) => {
   return subtype;
};

const sizesSubtypeFormat = (subtype) => {
   return `${subtype}x${subtype}`;
};

const games = {
   classic: new Game(
      'Classic',
      ['easy', 'normal', 'hard'],
      classicSubtypeFormat
   ),
   classicResized: new Game(
      'Classic Resized',
      [4, 6, 8, 9, 10, 12, 14, 16],
      sizesSubtypeFormat
   ),
   classicX: new Game('ClassicX', [4, 9, 16], sizesSubtypeFormat),
   jigsaw: new Game('Jigsaw', [4, 6, 8, 9, 10, 12, 14, 16], sizesSubtypeFormat),
   samurai: new Game('Samurai', [9, 12], sizesSubtypeFormat),
   samuraiMixed: new Game('Samurai mixed', [9, 12], sizesSubtypeFormat),
};

const askForGameType = async () => {
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

const askForSubtype = async (game) => {
   return await ask(
      `Select subtype of ${game.name}\n${game.subtypes
         .map((value, index) => {
            return `${index + 1}) ${game.subtypeFormatFunction(value)}\n`;
         })
         .join('')}`
   );
};

const askForCount = async (selectedGameName, selectedSubtype) => {
   return await ask(
      `How many games of type ${selectedGameName} with subtype ${selectedSubtype} (1-200)`
   )
}

const startDialogue = async () => {
   let gameNumber;
   while (true) {
      gameNumber = parseInt(await askForGameType());
      if (gameNumber >= 1 && gameNumber <= Object.keys(games).length) {
         break;
      }
   }
   let selectedGame = games[Object.keys(games)[gameNumber - 1]];
   let selectedGameSubtype;
   while (true) {
      selectedGameSubtype = parseInt(await askForSubtype(selectedGame));
      if (gameNumber >= 1 && gameNumber <= selectedGame.subtypes.length) {
         break;
      }
   }
   let count
   while (true) {
      count = parseInt(await askForCount(selectedGame.name, selectedGame.subtypes[selectedGameSubtype - 1]))
      if (count >= 1 && count <= 200) {
         break;
      }
   }
};
startDialogue();
