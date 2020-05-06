import { ADD_CAT, DELETE_CAT,MOD_CAT } from './types';

export const addCat = (n,c,b) => (
  {
      type: ADD_CAT,
      name: n,
      color:c,
      breed:b
  }
);

export const deleteCat = (key) => (
  {
    type: DELETE_CAT,
    key: key
  }
);

export const updateCat = (key,n,c,b) => (
    {
        type: MOD_CAT,
        key: key,
        name: n,
        color:c,
        breed:b
    }
);
