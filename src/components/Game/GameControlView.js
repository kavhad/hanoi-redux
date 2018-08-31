import React from 'react';
import PropTypes from 'prop-types';



class GameControlView extends React.Component {
  constructor(props, context) {
    super(props, context);

    const {numberOfDiscs, speed} = this.props;

    this.state = {
      fields: {
        numberOfDiscs,
        speed
      }
    };

    this.onSaveGameParameters = this.onSaveGameParameters.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSaveGameParameters() {
    this.props.onSaveGameParameters(parseInt(this.state.fields.numberOfDiscs, 10), parseInt(this.state.fields.speed, 10));
  }

  onChange(event) {
    const field = event.target.name;
    const fields = this.state.fields;
    fields[field] = event.target.value;

    return this.setState({fields});
  }

  render() {


    return (<div id="gameControlView">
      <div style={{flexGrow:0.1}}>
        <input type="number" min="1" onChange={this.onChange} name="numberOfDiscs" value={this.state.fields.numberOfDiscs}  placeholder="number of discs" />
      </div>
      <div style={{flexGrow:0.0}}>
        <input type="number"         onChange={this.onChange} name="speed"         value={this.state.fields.speed}          placeholder="speed (lower = faster)" min="0" />
      </div>
      <div style={{flexGrow:0.1}}>
        <button onClick={this.onSaveGameParameters}>Save</button>
      </div>
    </div>);
  }
}

GameControlView.propTypes = {
  onSaveGameParameters : PropTypes.func.isRequired,
  numberOfDiscs: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired
};


export default GameControlView;
