import routes from 'routes';
import {
   ClassicEasySudokuIcon,
   ClassicHardSudokuIcon,
   ClassicNormalSudokuIcon,
   DiagonalSudokuIcon,
   JigsawSudokuIcon,
   SamuraiMixedSudokuIcon,
   SamuraiSudokuIcon,
   Size2x2SudokuIcon,
   Size2x3SudokuIcon,
   Size4x4SudokuIcon,
} from 'components/atoms/Icons';

class Game {
   constructor(route, name, ImageIcon) {
      this.route = route;
      this.name = name;
      this.ImageIcon = ImageIcon;
   }
}

const sizes = {
   size2x2: '2x2',
   size2x3: '2x3',
   size2x4: '2x4',
   size3x3: '3x3',
   size2x5: '2x5',
   size3x4: '3x4',
   size4x4: '4x4',
   size4x5: '4x5',
   size5x5: '5x5',
};

const games = {
   // classic: new Game(routes.classic, ),
   classicCustomSize: {
      size2x2: new Game(routes.size2x2, '2x2', Size2x2SudokuIcon),
      size2x3: new Game(routes.size2x3, '2x3', Size2x3SudokuIcon),
      size4x4: new Game(routes.size4x4, '4x4', Size4x4SudokuIcon),
   },
   other: {
      diagonal: new Game(routes.diagonal, 'Diagonal', DiagonalSudokuIcon),
      jigsaw: new Game(routes.jigsaw, 'Jigsaw', JigsawSudokuIcon),
      samurai: new Game(routes.samurai, 'Samurai', SamuraiSudokuIcon),
      samuraiMixed: new Game(
         routes.samuraiMixed,
         'Samurai combo',
         SamuraiMixedSudokuIcon
      ),
   },
};

const getOpenedGame = (route) => {
   for (const gameCategory in games) {
      const gameCategoryObject = games[gameCategory];
      for (const game in gameCategoryObject) {
         const gameObject = gameCategoryObject[game];
         if (gameObject.route === route) {
            return gameObject;
         }
      }
   }
};

export { getOpenedGame };
export default games;
