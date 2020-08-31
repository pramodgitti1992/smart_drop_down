import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Constants } from '../Redux/ActionConstants'
import SmartDropDownSearch from './SmartDropDownSearch';
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
    this.props.getCountryList();
  }

  async componentDidUpdate(prevProps){
    if(prevProps.county_list !== this.props.county_list){
      if(this.props.county_list){
        this.setState({ countryList : this.props.county_list});
      }
    }
    
    if(prevProps.add_country_response !== this.props.add_country_response){
      if(this.props.add_country_response){
        this.fnAddCountryHandler(this.props.add_country_response);
      }
    }
  }

  addAndSelectHandler = async (CountryInput, flag) => {
    if(flag === "Add"){  // In case user clicks on Add Button
      this.props.addnewCountry(CountryInput);
    }
    else if(flag === "Select") { // In case user selects any country
      this.setState({selectedCountry : CountryInput})
    }
  }

  fnAddCountryHandler = (response) => {
    if(response.status === 500){
      alert("Adding duplicate coutnries are not allowed !!!");
      return false;
     }

    alert("Added Successfully !!!");
    this.props.getCountryList();
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

const mapStateToProps = state => {
  return {
    county_list: state.countryReducer.county_list,
    add_country_response: state.countryReducer.add_country_response
  }
};
const mapDispatchToProps = (dispatch) => ({
  getCountryList: () => dispatch({ type: Constants.GET_COUNTRY_LIST }),
  addnewCountry: countryName => dispatch({ type: Constants.ADD_NEW_COUNTRY, payload: countryName })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
