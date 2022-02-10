const express = require("express");
const {EasyGame, NormalGame, HardGame, Size2x2Game, Size2x3Game, Size4x4Game, DiagonalGame, JigsawGame, SamuraiGame, SamuraiMixedGame} = require('/src/database/schemas/Games');

const router = express.Router();

router.get("/easy", async (req, res) => {
   const game = await EasyGame.aggregate([{ $sample: { size: 1 } }]);
   res.send(createVariant(game));
});

router.get("/normal", async (req, res) => {
   const game = await NormalGame.aggregate([{ $sample: { size: 1 } }]);
   res.send(createVariant(game));
});

router.get("/hard", async (req, res) => {
   const game = await HardGame.aggregate([{ $sample: { size: 1 } }]);
   res.send(createVariant(game));
});

router.get("/size2x2", async (req, res) => {
   const game = await Size2x2Game.aggregate([{ $sample: { size: 1 } }]);
   res.send(createVariant(game));
});

router.get("/size2x3", async (req, res) => {
   const game = await Size2x3Game.aggregate([{ $sample: { size: 1 } }]);
   res.send(createVariant(game));
});

router.get("/size4x4", async (req, res) => {
   const game = await Size4x4Game.aggregate([{ $sample: { size: 1 } }]);
   res.send(createVariant(game));
});

router.get("/diagonal", async (req, res) => {
   const game = await DiagonalGame.aggregate([{ $sample: { size: 1 } }]);
   res.send(createVariant(game));
});

router.get("/jigsaw", async (req, res) => {
   
});

router.get("/samurai", async (req, res) => {
   
});

router.get("/samuraiMixed", async (req, res) => {
   
});

module.exports = router;