
import React from "react";

export const Colors = ["#3BB0EA",
  "#F78765",
  "#22C993",
  "#FFC66B",
  "#FE8999",
  "#9690DF"]


export const TitleOptions = {
  statusBar: {
    backgroundColor: '#fff',
    style: 'dark'
  },
  topBar: {
    background: {
      color: '#fff',
    },
    elevation: 0,
    visible: true,
    title: {
      color: "#000",
      fontFamily: 'Karla-Bold',
      fontSize: 28
    },
    largeTitle: {
      visible: true,
      color: "#000",
      fontSize: 28,
      fontFamily: 'Karla-Bold'
    },
    drawBehind: false,
    searchBarHiddenWhenScrolling: false,
    translucent: true,
    searchBarPlaceholder: 'Search',
    rightButtons: [
      {
        id: 'search'
      },
    ],
    // drawBehind: false,
  },
};

export const BASE_URL = 'https://theridinghunter.com/asad';

export const HEADER_KEYS = {
  TOKEN: 'x-access-token'
};

