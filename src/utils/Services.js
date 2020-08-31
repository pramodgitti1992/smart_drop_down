import Axios from './Axios';

export default async function API(path,value){
  try{
    const response = await Axios.get(path+value);
    return response;
  }
  catch (e){
    alert("Internal Server Error. Please try again later.")
  }

}