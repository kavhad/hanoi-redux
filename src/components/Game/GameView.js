import React from 'react';
import PropTypes from 'prop-types';


class GameView extends React.Component {

  renderStack(discs, stackNumber, stackHeightTotalGrow, discWidthMultiplier, totalNumDiscs, colors, stackName) {
    return (
      <div className="stack" style={{flexGrow:'27'}} onClick={this.props.clickStack(stackName)} >
        <div style={{flexGrow:2, flexBasis:'2vh'}} className="stack-col stack-col-beg" />
        <div style={{flexGrow:(2 + totalNumDiscs - discs.length), width:'100%', flexBasis:(2 + totalNumDiscs - discs.length)+'vh'}} className="stack-col">
          <div style={{flexGrow:((27-discWidthMultiplier*0.5)*0.5).toString()}} />
          <div style={{flexGrow:(discWidthMultiplier*0.5).toString()}} className="stack-bar" />
          <div style={{flexGrow:((27-discWidthMultiplier*0.5)*0.5).toString()}} />
        </div>
        {discs.map(discSize => this.renderDisk(discSize, discWidthMultiplier, colors[discSize-1]))}
        <div className="stack-col stack-col-end" />
      </div>
    );
  }

  renderDisk(discSize, discWidthMultiplier, colors) {
    return (<div key={discSize} style={{flexGrow:'1'}} className="disc-cnt">
              <div style={{flexGrow:((27-discWidthMultiplier*discSize)*0.5).toString()}} />
              <div style={{flexGrow:(discWidthMultiplier*discSize).toString(), backgroundColor: 'rgba('+colors[0]+','+colors[1]+','+colors[2]+', 1.0)' }} className="disc" />
              <div style={{flexGrow:((27-discWidthMultiplier*discSize)*0.5).toString()}} />
            </div>);
  }

  render() {

    const {stacks, stackHeightTotalGrow, discWidthMultiplier, totalNumDiscs, colors} = this.props;
    return (<div className="stacks">
      {this.renderStack(stacks.a, 1, stackHeightTotalGrow, discWidthMultiplier, totalNumDiscs, colors, 'a')}
      <div className="gutter" style={{flexGrow:'4.5'}} />
      {this.renderStack(stacks.b, 2, stackHeightTotalGrow, discWidthMultiplier, totalNumDiscs, colors, 'b')}
      <div className="gutter" style={{flexGrow:'4.5'}} />
      {this.renderStack(stacks.c, 3, stackHeightTotalGrow, discWidthMultiplier, totalNumDiscs, colors, 'c')}
    </div>);
  }

}



GameView.propTypes = {
  stackHeightTotalGrow : PropTypes.number.isRequired,
  stacks: PropTypes.object.isRequired,
  discWidthMultiplier: PropTypes.number.isRequired,
  totalNumDiscs: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
  clickStack: PropTypes.func.isRequired
};

export default GameView;
