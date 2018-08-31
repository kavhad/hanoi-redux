import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stackActions from '../../actions/stackActions';
import GameView from './GameView';
import GameControlView from './GameControlView'

export class GamePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = this.initializeStateData();

    this.clickStack = this.clickStack.bind(this);
    this.onSaveGameParameters = this.onSaveGameParameters.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    const { stackMoves } = nextProps;

    stackMoves.forEach(nextMove =>  {
      this.updateStackByMove(nextMove);
    });

  }

  updateStackByMove(move) {


    const stacks = this.state.stacks;
    const disc = stacks[move.from].shift();
    stacks[move.to].unshift(disc);

    //will update stacks to reflect new move
    this.setState({
      stacks
    });

    setTimeout(() => {
      //call action to notify move is finished,
      //will trigger next move to be ready for handling and causes the
      //componentWillReceiveProps to be called again
      this.props.actions.finishMoveDisc(move);
    }, this.state.speed);

  }


  initializeStateData(numOfDiscs = 6, speed = 50) {
    const data = {
      stacks: {a:this.createStack(numOfDiscs), b:[],c:[]},
      numberOfDiscs:numOfDiscs,
      colors:this.colours(numOfDiscs),
      isMoving:false,
      speed: speed
    };

    return data;
  }

  createStack(numOfDiscs) {
    const stack = [];

    for(let i = 1; i <= numOfDiscs; i++) {
      stack.push(i);
    }

    return stack;

  }


  colours(numOfDiscs) {

    const colors = [];

    for(let i = 1; i - 1 < numOfDiscs; i++) {
      colors.push(
        [ i * Math.ceil(255/numOfDiscs),
         (i * Math.ceil(255/numOfDiscs)) % 64,
         (i * Math.ceil(255/numOfDiscs)) % 128]);
    }

    return colors;
  }

  calcStackHeightTotalGrow() {
    return this.state.numberOfDiscs + 3;
  }

  calcDiscWidthMultiplier() {
    return 24.0 / this.state.numberOfDiscs;
  }

  clickStack(to) {

    return () => {

      if(this.state.isMoving)
        return;

      let discStack = null;

      if(this.state.stacks.a.length > 0) {
        discStack = 'a';
      }
      else if(this.state.stacks.b.length > 0) {
        discStack = 'b';
      }
      else {
        discStack = 'c';
      }

      if(to === discStack) {
        return;
      }

      const intermediate = 'c' !== to && 'c' !== discStack ? 'c' : ('b' !== to && 'b' !== discStack ? 'b' : 'a');

      this.setState({isMoving:true});

      this.props.actions.moveStack(stackActions.createStackMove(discStack, to, intermediate, this.state.numberOfDiscs))
          .then(() => {
            this.setState({isMoving:false});
          });
    };

  }

  onSaveGameParameters(numberOfDiscs, speed) {
    if(!this.state.isMoving) {
      this.setState(this.initializeStateData(numberOfDiscs, speed));
    }
  }

  render() {
    return  (
      <div>
        <GameControlView
        onSaveGameParameters={this.onSaveGameParameters}
        speed={this.state.speed}
        numberOfDiscs={this.state.numberOfDiscs}
        />
        <GameView
        stacks={this.state.stacks}
        stackHeightTotalGrow={this.calcStackHeightTotalGrow()}
        discWidthMultiplier={this.calcDiscWidthMultiplier()}
        colors={this.state.colors}
        totalNumDiscs={this.state.numberOfDiscs}
        clickStack={this.clickStack}
        />
      </div>
    );
  }


}

GamePage.propTypes = {
  stackMoves: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  stackMoves: state.stackMoves
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(stackActions, dispatch)
});

export default  connect(mapStateToProps, mapDispatchToProps)(GamePage);
