import * as types from './actionTypes';


export const createStackMove = (start, end, intermediate, stackDepth) => ({
  start,
  end,
  intermediate,
  stackDepth
});

const createDeferredMove = (moves = []) => {
  return {
    type: types.PRODUCE_MOVES,
    moves
  };
};

const createMoveDisc = (from, to) => ({from, to});

export const producesMoves = (stackMove) => dispatch => {
  const explodedMoveds = explodeMove(stackMove);
  dispatch(createDeferredMove(explodedMoveds));
};

export const consumeMove = (move) => dispatch => {

  const {discMove,stackMove} = move;

  const explodedMoveds = explodeMove(stackMove); //explode the remainder moves

  dispatch({type:types.REPLACE_HEAD_MOVE, moves: explodedMoveds}); // replace the previous move with the exploded moves at the head
  dispatch({type:types.CONSUME_DISC_MOVE,move:discMove});

};

//explodeMove
//recursive method that will expand the stack move so that first element contains the first hanoi move of one disc needed to run and the rest is remaining moves
//explodedMoves will containt log(n) elements.
export const explodeMove = (stackMove, explodedMoveds = []) => {

  if(!stackMove) //if stackMove is undefined or null just return there's nothing to do
    return explodedMoveds;

  if(stackMove.stackDepth === 1) { //if the stack is 1 deep (== there's only one disc) then set move one
    explodedMoveds.push({
      discMove: createMoveDisc(stackMove.start, stackMove.end)
    });
    return explodedMoveds;
  }

  explodeMove(  //there's more than 1 disc so move the first n - 1 disc to intermediate place by recursion
    {
      start: stackMove.start,
      end: stackMove.intermediate,
      intermediate: stackMove.end,
      stackDepth: stackMove.stackDepth - 1
    }, explodedMoveds);

  //store the remaining moves, the move of the biggest disc and the n - 1 disc after it to final position into explodedMoveds array
  explodedMoveds.push({
    discMove: createMoveDisc(stackMove.start, stackMove.end),
    stackMove:
    {
      start: stackMove.intermediate,
      end: stackMove.end,
      intermediate: stackMove.start,
      stackDepth: stackMove.stackDepth - 1
    }
  });

  return explodedMoveds;

};


export const initStack = (numberOfDiscs) => dispatch => dispatch({
  type: types.RESET_NUMBER_OF_DISCS,
  numberOfDiscs: numberOfDiscs
});
