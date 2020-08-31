import { Constants } from '../ActionConstants';

export const initialState = {
  county_list: '',
  add_country_response: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case Constants.SET_COUNTRY_LIST:
      state = {
        ...state,
        county_list: action.payload
      }
      return state;
    case Constants.SET_ADD_COUNTRY_RESPONSE:
    state = {
      ...state,
      add_country_response: action.payload
    }
    return state; 
    default:
      return state;
  }
};