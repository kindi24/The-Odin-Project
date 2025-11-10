import knightTravails from "./knight-moves.js";

const solver = new knightTravails();

solver.knightMoves([0,0],[1,2]);
solver.knightMoves([0,0],[3,3]);
solver.knightMoves([3,3],[0,0]);
solver.knightMoves([0,0],[7,7]);
solver.knightMoves([3,3],[4,3]);