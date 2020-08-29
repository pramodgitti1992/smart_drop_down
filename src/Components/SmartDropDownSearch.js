import React, { Component } from 'react';
import AccordionComponent from './common/AccordionComponent'
import { filterCountries } from './utils/Utils';

class SmartDropDownSearch extends Component {
  constructor(props){
    super(props);
    this.state={
      CountryInput:'',
      displayCountryList: this.props.countryList,
      displayLimit: this.props.noOfItems,
      disableAddBtn: false
    }
  }

  componentDidMount() {
    this.searchField.focus()
  }

  async componentDidUpdate(prevProps){
    if(prevProps.countryList !== this.props.countryList){
      if(this.props.countryList){
        await this.setState({
          displayCountryList : this.props.countryList,
          disableAddBtn: false
        });
        this.searchCountry(this.state.CountryInput)
      }
    }
  }

  searchCountry = async value => {
    await this.setState({CountryInput : value});
    const countryList = this.props.countryList;
    const CountryInput = this.state.CountryInput;
    const displayCountryList = filterCountries(countryList,CountryInput);
    this.setState({displayCountryList});
  }

  increaseDispLimit = () => {
    const oldLimit = this.state.displayLimit;
    const newlimit = oldLimit + this.props.noOfItems;
    this.setState({displayLimit: newlimit})
  }

  fnAddCountry = async () => {
    const { CountryInput } = this.state;
    await this.setState({
      disableAddBtn: true
    });
    this.props.addAndSelectHandler(CountryInput, 'Add');
  }

  render(){
    const { CountryInput, displayCountryList, displayLimit, disableAddBtn } = this.state;
    const { noOfItems, privilidge, addAndSelectHandler } = this.props;
    return (
      <div className="smart-search">
        <AccordionComponent title="Select a location">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input type="text" value={CountryInput}
            onChange={e => this.searchCountry(e.target.value)}
            ref={d=>this.searchField=d}
            />
          <div className="search-result">
            {displayCountryList.slice(0, displayLimit).map((country,index) => (
                <li key={index} onClick={()=>addAndSelectHandler(country, 'Select')}>{country}</li>
            ))}
            {displayCountryList.length>displayLimit &&
              <p onClick={this.increaseDispLimit}>{`${noOfItems} more...`}</p>
            }
            {displayCountryList.length === 0 && CountryInput !== ""  && 
              <li className="mt-1" disabled>
                {`"${CountryInput}" not found`}
                {privilidge && <button className="add-select" onClick={this.fnAddCountry} disabled={disableAddBtn}>Add & select</button>}
              </li>
            }
          </div>
        </AccordionComponent>
      </div>
    );
  }
}

export default SmartDropDownSearch;
