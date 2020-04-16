/* eslint-disable no-unused-vars */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  PanResponder,
  Animated,
} from 'react-native';

export default class Draggable extends Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY(),
    };
  }

  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 };
    
    const { pan } = this.state;

    pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (e, gesture) => true,

      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),

      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset();
        // if(gesture.moveY <300){
        if(gesture.dy <10){
          this.timeAnimation(0);
        }else{
          this.timeAnimation(500);
        }
       
      },

      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },
      

    });
  }

  timeAnimation = (value) =>{
    Animated.timing( this.state.pan, {
      toValue: { x: 0, y: value },
      duration: 200,
    }).start();
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.circle]}
      />
    );
  }
}

let CIRCLE_RADIUS = 100;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: 'skyblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});