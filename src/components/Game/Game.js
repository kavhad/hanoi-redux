import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stackActions from '../../actions/stackActions';
import GameView from './GameView';
import GameControlView from './GameControlView';

export class GamePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = this.initializeStateData();

    this.clickStack = this.clickStack.bind(this);
    this.onSaveGameParameters = this.onSaveGameParameters.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.scheduledLoop = null;
  }



  componentWillReceiveProps(nextProps) {
    const { haveMovesLeft, nextMove, stacks } = nextProps;

    if(haveMovesLeft && !this.state.isRunning) {
      this.setState({isRunning:true});
      this.scheduledLoop = setInterval(this.gameLoop, this.state.speed);
    }

  }

  gameLoop() {
    if(this.props.haveMovesLeft) {
      this.props.actions.consumeMove(this.props.nextMove);
    }
    else {
      clearInterval(this.scheduledLoop);
      this.setState({isRunning:false});
    }
  }

  executeMove(move) {

    this.props.actions.consumeMove(move,
      move.stackMove ?
        new Promise((resolve) => setTimeout(() => resolve(), this.state.speed)) : null
    );

  }

  initializeStateData(numOfDiscs = 6, speed = 50) {

    this.props.actions.initStack(numOfDiscs);
    const data = {
      numberOfDiscs:numOfDiscs,
      colors:this.colours(numOfDiscs),
      isRunning:false,
      speed: speed
    };

    return data;
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

      if(this.state.isRunning)
        return;

      let discStack = null;

      if(this.props.stacks.a.length > 0) {
        discStack = 'a';
      }
      else if(this.props.stacks.b.length > 0) {
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

      this.props.actions.producesMoves(stackActions.createStackMove(discStack, to, intermediate, this.state.numberOfDiscs));


    };

  }

  onSaveGameParameters(numberOfDiscs, speed) {
    this.setState(this.initializeStateData(numberOfDiscs, speed));
  }

  render() {
    return  (
      <div>
        <GameControlView
        onSaveGameParameters={this.onSaveGameParameters}
        speed={this.state.speed}
        numberOfDiscs={this.state.numberOfDiscs}
        />
        {
        this.props.stacks &&
        <GameView
        stacks={this.props.stacks}
        stackHeightTotalGrow={this.calcStackHeightTotalGrow()}
        discWidthMultiplier={this.calcDiscWidthMultiplier()}
        colors={this.state.colors}
        totalNumDiscs={this.state.numberOfDiscs}
        clickStack={this.clickStack}
        />}
      </div>
    );
  }


}

GamePage.propTypes = {
  nextMove: PropTypes.object,
  haveMovesLeft: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  stacks: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  haveMovesLeft: state.moves.length > 0,
  nextMove: state.moves.length > 0 ? state.moves[0] : null,
  stacks: state.stacks
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(stackActions, dispatch)
});

export default  connect(mapStateToProps, mapDispatchToProps)(GamePage);
