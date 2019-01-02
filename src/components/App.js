import React, { Component } from "react";
import "./App.css";

// componets
import Select from "react-select";

// utils
import {
  renameJsonArrayItemKeys,
} from "./utils";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      possibleActions: [],
      availableCountries: [],
      availableMines: [],
      availableLocations: [],
      selectedAction: '',
      selectedCountry: '',
      selectedLocation: '',
      selectedMine: '',
      phone: '',
      email: '',
      wizardButtons: true,
      visibleSections: { // keep these in sequential order of visibility
        "actionSelect": true,
        "phone": false,
        "email": false,
        "country-select": false,
        "location-select": false,
        "mines-select": false,
        "buttons": false,
      }
    }
    this.onChange = this.onChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleMineSelect = this.handleMineSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNext = () => {
    if(this.state.visibleSections.actionSelect && this.state.selectedAction !== '') {
      this.setState({
        visibleSections: {
          "actionSelect": false,
          "phone": true,
          "email": true,
          "country-select": false,
          "location-select": false,
          "buttons": false
        }
      });
    }
    if(this.state.visibleSections.phone && this.state.email !== null && this.state.phone !==null) {
      this.setState({
        visibleSections: {
          "actionSelect": false,
          "phone": false,
          "email": false,
          "country-select": true,
          "location-select": false,
          "buttons": false
        }
      });
    }
  }

  handlePrev = () => {
  }

  componentDidMount = () => {
    // fetch possible actions from database
    fetch(process.env.REACT_APP_API_URL+'/api/v1/actions')
      .then(response => response.json())
      .then(data => {
        const actionMapping = {
          id: "value",
          description: "label"
        }
        let possibleActions = renameJsonArrayItemKeys(data, actionMapping);
        this.setState({ possibleActions });
      });

    // fetch countries from database
    fetch(process.env.REACT_APP_API_URL+'/api/v1/countries')
      .then(response => response.json())
      .then(data => {
        const countryMapping = {
          id: "value",
          name: "label"
        }
        let availableCountries = renameJsonArrayItemKeys(data, countryMapping);
        this.setState({ availableCountries });
      });
  }

  handleSelect = (e) => {
    // console.log(e);
    this.setState({
      visibleSections: { // keep these in sequential order of visibility
        "actionSelect": false,
        "phone": false,
        "email": false,
        "country-select": true,
        "location-select": false,
        "mines-select": false,
        "buttons": false
      },
      selectedCountry: e._id
    }, () => {
      this.getLocations();
    });
  }

  getLocations(){
    fetch(process.env.REACT_APP_API_URL+'/api/v1/countries/'+this.state.selectedCountry+'/locations')
      .then(response => response.json())
      .then(data => {
        const locationMapping = {
          id: "value",
          name: "label"
        }
        let availableLocations = renameJsonArrayItemKeys(data, locationMapping);
        this.setState({ 
          visibleSections: { // keep these in sequential order of visibility
            "actionSelect": false,
            "phone": false,
            "email": false,
            "country-select": true,
            "location-select": true,
            "mines-select": false,
            "buttons": false
          },
          availableLocations
        });
      });
  }

  handleLocationSelect(e){
    this.setState({
      selectedLocation: e._id
    }, () => {
      this.getMines();
    })
  }

  getMines(){
    fetch(process.env.REACT_APP_API_URL+'/api/v1/locations/'+this.state.selectedLocation+'/mines')
      .then(response => response.json())
      .then(data => {
        const minesMapping = {
          id: "value",
          name: "label"
        }
        let availableMines = renameJsonArrayItemKeys(data, minesMapping);
        this.setState({ 
          visibleSections: { // keep these in sequential order of visibility
            "actionSelect": false,
            "phone": false,
            "email": false,
            "country-select": true,
            "location-select": true,
            "mines-select": true,
            "buttons": false
          },
          availableMines
        });
      });
  }

  handleMineSelect(e){
    this.setState({ 
      selectedMine: e._id,
    }, () => {
      this.setButtonVisibility();
    });
  }

  setButtonVisibility(){
    this.setState({
      visibleSections: { // keep these in sequential order of visibility
        "actionSelect": false,
        "phone": false,
        "email": false,
        "country-select": true,
        "location-select": true,
        "mines-select": true,
        "buttons": true
      },
      wizardButtons: false,
    });
  }

  onChange = (e) => {
    this.setState({
      selectedAction: e._id,
    });
  }

  handleSubmit(){
    let actualState = this.state;
    delete actualState.possibleActions;
    delete actualState.availableCountries;
    delete actualState.availableMines;
    delete actualState.availableLocations;
    delete actualState.visibleSections;
    fetch(process.env.REACT_APP_API_URL+'/api/v1/subscriptions', {
      method: 'post',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(actualState)
    }).then(() => alert('successfully posted data'));

  }

  render() {
    const {possibleActions, visibleSections} = this.state;
    return (
        <div className="main">
        <div className="banner">
        <h1>EIMOG</h1>
        <hr/>
        </div>

        <div className="torso">
        {
          visibleSections["actionSelect" ]?
            <div className="stage actionSelect">
            <h4>I want to ...</h4>
            <Select options={possibleActions}
          isSearchable="true"
            autoFocus="true"
            placeholder="type/select action"
            onChange={this.onChange}
          />
            </div>
            :
            <span className="hidden"></span>
        }
    {
      visibleSections["email"] ?
        <div className="stage phone-email">
        <h4>Enter Email</h4>
        <input className="form-control" type="email" name="email" onChange={e=>this.setState({email: e.target.value})} placeholder="enter email" style={{ padding:'5px' }}/>
        </div> :
        <span className="hidden"></span>
    }
    {
      visibleSections["phone"] ?
        <div className="stage phone-email">
        <h4>Enter Phone</h4>
        <input type="text" name="phone" className="form-control" onChange={e=>this.setState({phone: e.target.value})} placeholder="enter phone" style={{ padding:'5px' }}/>
        </div> :
        <span className="hidden"></span>
    }
    {
      visibleSections["country-select"] ?
        <div className="stage country-select">
        <h4>Select Country</h4>
        <Select options={this.state.availableCountries}
      isSearchable="true"
        placeholder=""
        onChange={this.handleSelect}
      />
        </div> :
        <span className="hidden"></span>
    }
    {
      visibleSections["location-select"] ?
        <div className="stage location-select">
        <h4>Select Location</h4>
        <Select options={this.state.availableLocations}
      isSearchable="true"
        placeholder=""
        onChange={this.handleLocationSelect}
      />
        </div> :
        <span className="hidden"></span>
    }
    {
      visibleSections["mines-select"] ?
        <div className="stage mines-select">
        <h4>Select Mine</h4>
        <Select options={this.state.availableMines}
      isSearchable="true"
        placeholder=""
        onChange={this.handleMineSelect}
      />
        </div> :
        <span className="hidden"></span>
    }
    {
      visibleSections["buttons"] ?
        <div className="stage country-select">
        <button type="button" onClick={this.handleSubmit}>Process Form Information</button>
        </div> :
        <span className="hidden"></span>
    }                    
    </div>
      <div className="footer"></div>
      { this.state.wizardButtons &&
        <div>
          <button className="btn prev" onClick={this.handlePrev}>Prev</button> 
          <button className="btn next" onClick={this.handleNext}>Next</button>
        </div>
      }
    </div>
      );
  }
} export default App;
