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

const games = {
   classic: {
      classicEasy: new Game(
         routes.classicEasy,
         'Jednoduché',
         ClassicEasySudokuIcon
      ),
      classicNormal: new Game(
         routes.classicNormal,
         'Střední',
         ClassicNormalSudokuIcon
      ),
      classicHard: new Game(routes.classicHard, 'Těžké', ClassicHardSudokuIcon),
   },
   size: {
      size2x2: new Game(routes.size2x2, '2x2', Size2x2SudokuIcon),
      size2x3: new Game(routes.size2x3, '2x3', Size2x3SudokuIcon),
      size4x4: new Game(routes.size4x4, '4x4', Size4x4SudokuIcon),
   },
   other: {
      diagonal: new Game(routes.diagonal, 'Diagonální', DiagonalSudokuIcon),
      jigsaw: new Game(routes.jigsaw, 'Jigsaw', JigsawSudokuIcon),
      samurai: new Game(routes.samurai, 'Samurai', SamuraiSudokuIcon),
      samuraiMixed: new Game(
         routes.samuraiMixed,
         'Samurai kombinace',
         SamuraiMixedSudokuIcon
      ),
   },
};

export default games;
