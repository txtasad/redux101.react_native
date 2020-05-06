import React from "react";

import { Navigation } from 'react-native-navigation';
import App from '../App';
import {Provider} from 'react-redux';
import configureStore from '../store';

const store = configureStore();

import Screen1 from "../screens/Screen1";
import Screen2 from "../screens/Screen2";


function start() {
  Navigation.registerComponentWithRedux('navigation.playground.Screen1', () => Screen1,Provider,store);
  Navigation.registerComponentWithRedux('navigation.playground.Screen2', () => Screen2,Provider,store);
  //adding other screens here

  Navigation.registerComponent('navigation.playground.App', () => App);

  console.log('start');
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      bottomTab: {
        iconColor: '#333',
        selectedIconColor: '#000',
        textColor: '#333',
        selectedTextColor: '#000',
        fontFamily: 'HelveticaNeue',
        fontSize: 13
      },
      _animations: {
        startApp: {
          y: {
            from: 1000,
            to: 0,
            duration: 500,
            interpolation: 'accelerate',
          },
          alpha: {
            from: 0,
            to: 1,
            duration: 500,
            interpolation: 'accelerate'
          }
        },
        push: {
          waitForRender: false,
          topBar: {
            id: 'TEST',
            alpha: {
              from: 0,
              to: 1,
              duration: 500,
              interpolation: 'accelerate'
            }
          },
          bottomTabs: {
            y: {
              from: 1000,
              to: 0,
              duration: 500,
              interpolation: 'decelerate',
            },
            alpha: {
              from: 0,
              to: 1,
              duration: 500,
              interpolation: 'decelerate'
            }
          },
          content: {
            y: {
              from: 1000,
              to: 0,
              duration: 500,
              interpolation: 'accelerate',
            },
            alpha: {
              from: 0,
              to: 1,
              duration: 500,
              interpolation: 'accelerate'
            }
          }
        },
        pop: {
          topBar: {
            id: 'TEST',
            alpha: {
              from: 1,
              to: 0,
              duration: 500,
              interpolation: 'accelerate'
            }
          },
          bottomTabs: {
            y: {
              from: 0,
              to: 100,
              duration: 500,
              interpolation: 'decelerate',
            },
            alpha: {
              from: 1,
              to: 0,
              duration: 500,
              interpolation: 'decelerate'
            }
          },
          content: {
            y: {
              from: 0,
              to: 1000,
              duration: 500,
              interpolation: 'decelerate',
            },
            alpha: {
              from: 1,
              to: 0,
              duration: 500,
              interpolation: 'decelerate'
            }
          }
        }
      }
    });

    console.log('start')
    setRoot()


  });


}

function setRoot() {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'TEST',
        children: [
          {
            component: {
              name: 'navigation.playground.App'
            }
          }
        ]
      }
    }
  });
}

module.exports = {start};
