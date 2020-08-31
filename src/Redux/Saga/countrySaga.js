import { takeEvery } from 'redux-saga/effects';
import { Constants } from '../ActionConstants';
import Store from '../Store/store';
import API from '../../utils/Services';
import { GET_COUNTRY_LIST_PATH, ADD_NEW_COUNTRY_PATH } from '../../utils/Constants';

async function getCountyList(){
  const response = await API(GET_COUNTRY_LIST_PATH,"");
  
  if(!response) return false;

  if(response.status !== 200){
   alert("Internal Server Error. Please try again later.");
   return false;
  }

  Store.dispatch({
    type: Constants.SET_COUNTRY_LIST,
    payload: response.data.countries
  })
}

async function addNewCountry(action){
  const response = await API(ADD_NEW_COUNTRY_PATH,action.payload);
  
  if(!response) return false;

  Store.dispatch({
    type: Constants.SET_ADD_COUNTRY_RESPONSE,
    payload: response
  })
}

export function* CountryWatcherSaga() {
  yield takeEvery(Constants.GET_COUNTRY_LIST, getCountyList);
  yield takeEvery(Constants.ADD_NEW_COUNTRY, addNewCountry);
}