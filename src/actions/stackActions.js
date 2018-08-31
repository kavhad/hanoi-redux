import * as types from './actionTypes';

export const createMoveDisc = (from, to) => ({
  type: types.START_MOVE_DISC,
  move: {from, to}
});

export const createStackMove = (start, end, intermediate, stackDepth) => ({
  start,
  end,
  intermediate,
  stackDepth
});

let pullNextMoveResolver = () => {};

//moveStack
//greedy algorithm that solves towers of hanoi problem using a producer/consumer pattern.
//First move is immediatly produced and dispatched when this function is called, but next move is only produced when
//finishMoveChip has been called by the consumer.
//space complexity is (O(log(n)) because of the promises which are used to defer action until consumer has consumed previous move.
//time complexity O(Log(N)) per move, but a total of O(2^N) when considering all moves and this is optimal, where N Is number of discs in tower.
export const moveStack = stackMove => dispatch => {

  let waiter = Promise.resolve();

  return moveStackAux(stackMove, waiter)(dispatch);
};

const moveStackAux = (stackMove, waiter) => dispatch => {

  return waiter.then(() => {

    if(stackMove.stackDepth >= 2) {
      const waiterNext = moveStackAux(
        {
          stackDepth:stackMove.stackDepth -1,
          start: stackMove.start,
          end: stackMove.intermediate,
          intermediate: stackMove.end
        },
        waiter)(dispatch);

      return waiterNext.then(() => {
        dispatch(createMoveDisc(stackMove.start, stackMove.end));
        //after each dispatch of move create new waiter as we have to
        //wait until consumer has signaled it has consumed the previous move
        return moveStackAux(
          {
          stackDepth:stackMove.stackDepth - 1,
          start: stackMove.intermediate,
          end: stackMove.end,
          intermediate: stackMove.start
        },
        new Promise((resolve, reject) => { //new waiter
          pullNextMoveResolver = resolve;
        }))(dispatch);
      });
    }
    else if(stackMove.stackDepth === 1) {
      dispatch(createMoveDisc(stackMove.start, stackMove.end));
      //after each dispatch of move create new waiter as we have to
      //wait until consumer has signaled it has consumed the previous move
      const waiterNext = new Promise((resolve, reject) => {
        pullNextMoveResolver = resolve;
      });

      return waiterNext;
    }

    return waiter;

  });

};

//this code is  next hanoi move is dispatched
export const finishMoveDisc = (move) =>  {
  setTimeout(() => {
    pullNextMoveResolver();
  }, 0);


  return {
    type: types.FINISH_MOVE_DISC,
    move
  };
};
