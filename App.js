import React from 'react';
import {Navigation} from 'react-native-navigation';
import {StatusBar, View} from 'react-native';
const TAG = 'Navigation';
export default class MainApp extends React.Component{
  static get options() {
    return {
      statusBar: {
        backgroundColor: '#fff',
        drawBehind: false
      },
      topBar: {
        background: {
          color: '#fff'
        },
        title: {
          text: 'My Dashboard'
        },
        largeTitle: {
          visible: true,
        },
        drawBehind: false,
        visible: false,
        animate: false
      }
    };
  }


  constructor(properties) {
    super(properties);
    this.state = {
      authMode: 0
    }
  }

  componentWillUnmount() {
  }


  componentDidMount() {

    // we can check authentication here, if the app is logged in already and a offline session exists
    //or if valid move to our dashboard
    this.showMainScreen();
  }


  showMainScreen = () => {
    console.log(TAG, 'showMainScreen')
    Navigation.setRoot({
      root: {
        stack: {
          id: 'MyDashBoard',
          children: [
            {
              component: {
                name: 'navigation.playground.Screen1'
              }
            }
          ]
        }
      }
    });
  };


  render() {
    console.log('render App')
    StatusBar.setBarStyle('light-content', true)
    return(null);
  }
}
