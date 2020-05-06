import {ADD_CAT, DELETE_CAT, MOD_CAT} from '../actions/types';

const initialState = {
  catList: []
}

const catReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CAT:
      return {
        ...state,
        catList: state.catList.concat({
          key: Math.random(),
          name: action.name,
          color: action.color,
          breed: action.breed
        })
      };
    case DELETE_CAT:
      return {
        ...state,
        catList: state.catList.filter((item) =>
          item.key !== action.key)
      };
    case MOD_CAT:
      return {
        ...state,
        catList: state.catList.map((item) =>
            item.key === action.key ? {key: item.key,
              name: action.name,
              color: action.color,
              breed: action.breed} : item)
      };
    default:
      return state;
  }
}

export default catReducer;
