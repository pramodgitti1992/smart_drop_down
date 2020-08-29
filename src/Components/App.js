import React, {Component} from 'react';
import SmartDropDownSearch from './SmartDropDownSearch';
import Axios from './utils/Axios'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      countryList : [],
      selectedCountry : '',
      privilidge : true,
      noOfItems : 5,
      loggedInAs: 'admin'
    }
  }

  componentDidMount() {
    this.fnGetCountryList();
  }

  fnGetCountryList = async () => {
    try{
      const result = await Axios.get('/countries');
      if(result.status !== 200){ // if Response Status is not 200
        alert("something went wrong! Please try again later.");
        return false;
      }

      const countryList = result.data.countries;
      this.setState({ countryList});
    } catch (e) {
      alert(`something went wrong! Please try again later.`);
    }
  }

  addAndSelectHandler = async (CountryInput, flag) => {
    if(flag === "Add"){  // In case user clicks on Add Button
      try{
        const result = await Axios.get(`/addcountry?name=${CountryInput}`);
        if(result.status !== 200){ // if Response Status is not 200
          alert("something went wrong! Please try again later.");
          return false;
        }
        alert("Added Successfully !!!");
        this.fnGetCountryList();
      }
      catch(e){
        if(e.response.status === 500){
          alert("You are not allowed to add duplicate!!")
        }
      }
    }
    else if(flag === "Select") { // In case user selects any country
      this.setState({selectedCountry : CountryInput})
    }
  }

  changeUser = val => {
    const privilidge = (val === 'admin') ? true : false;
    this.setState({loggedInAs: val, privilidge})
  }

  render(){
    const { countryList, selectedCountry, privilidge, noOfItems, loggedInAs } = this.state;
    
    return (
      <div className="App">
        <div className="loginSection">
          Logged In As :
          <p className={(loggedInAs==='admin')?'active':''}
            onClick={()=>this.changeUser('admin')}>
            Admin
          </p>
          |
          <p className={(loggedInAs==='user')?'active':''} 
            onClick={()=>this.changeUser('user')}>
            User
          </p>
        </div>
        <SmartDropDownSearch countryList={countryList} privilidge={privilidge} noOfItems={noOfItems} addAndSelectHandler={this.addAndSelectHandler} />
        <br/>
        <p>{`Selected Country : ${selectedCountry}`}</p>
    </div>
    );
  }
}

export default App;
