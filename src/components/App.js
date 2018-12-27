import React, { Component } from "react";
import "./App.css";

// componets
import Select from "react-select";

// utils
import {
    renameJsonArrayItemKeys,
    matchPhoneOrEmail
} from "./utils";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            possibleActions: [],
            availableCountries: [],
            selectedAction: undefined,
            visibleSections: { // keep these in sequential order of visibility
                "action-select": true,
                "phone-email": false,
                "country-select": false,
                "buttons": false
            }
        }
        this.onChange = this.onChange.bind(this);
        this.addPhone = this.addPhone.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.addEmail = this.addEmail.bind(this);
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

    showHiddenSection = async (sectionToShow) => {
        const visibleSections = this.state.visibleSections;
        console.log(visibleSections);
        if (sectionToShow in visibleSections && !visibleSections[sectionToShow]) {
            visibleSections[sectionToShow] = true;
        }
        await visibleSections;
    }

    addPhone = (e) => {
        if(e.key === 'Enter') {
            this.setState({
                visibleSections: { // keep these in sequential order of visibility
                    "action-select": true,
                    "phone-email": true,
                    "country-select": true,
                    "buttons": false
                }
            });
        }
    }

    addEmail = (e) => {
        if(e.key === 'Enter') {
            this.setState({
                visibleSections: { // keep these in sequential order of visibility
                    "action-select": true,
                    "phone-email": true,
                    "country-select": true,
                    "buttons": false
                }
            });
        }
    }

    handleSelect = (e) => {
        console.log(e);
        this.setState({
            visibleSections: { // keep these in sequential order of visibility
                "action-select": true,
                "phone-email": true,
                "country-select": true,
                "buttons": true
            }
        });
    }

    onChange = (e) => {
        this.setState({
            visibleSections: { // keep these in sequential order of visibility
                "action-select": true,
                "phone-email": true,
                "country-select": false,
                "buttons": false
            }
        });
        return;
        const fieldId = e.target.getAttribute("id");
        const value = e.selection.getAttribute("value");

        let updateFields = {};

        switch (fieldId) {
            case "selectActions":
                updateFields = {
                    selectedAction: value,
                    visibleSections: this.showHiddenSection("phone-email")
                };
                break;
            case "inputPhoneOrEmail":
                //pattern: type, confidence, message
                const pattern = matchPhoneOrEmail(value);

                if (pattern.confidence === 100) {
                    updateFields = pattern.type === "phone" ?
                    {
                        phoneNumber: value,
                        visibleSections: this.showHiddenSection("buttons")
                    } :
                    {
                        email: value,
                        availableCountries: this.listAvailableCountries(),
                        visibleSections: this.showHiddenSection("select-country"),
                    }
                } else {
                    updateFields = {
                        hint: {
                            section: "phone-email",
                            message: pattern.message
                        }
                    }
                }
                break;
            case "selectCountry":
                updateFields = {
                    selectedCountry: value,
                    visibleSections: this.showHiddenSection("buttons")
                }
                break;
            default:
                updateFields = undefined;
                break;
        }

        if (updateFields) {
            this.setState(updateFields);
        }
    }

    render() {
        const {possibleActions, visibleSections} = this.state;
        return (
            <div className="main">
                <div className="banner">
                    <h1>MYNR</h1>
                    <p>local resource</p>
                    <hr/>
                </div>

                <div className="torso">
                    {
                        visibleSections["action-select" ]?
                        <div className="stage action-select">
                            <h4>I want to ...</h4>
                            <Select options={possibleActions}
                                isSearchable="true"
                                autoFocus="true"
                                placeholder="type/select action"
                                onChange={this.onChange}
                            />
                        </div> :
                        <span className="hidden"></span>
                    }
                    {
                        visibleSections["phone-email"] ?
                        <div className="stage phone-email">
                            <h4>Enter Phone / Email</h4>
                            <input type="text" name="phone" onKeyPress={this.addPhone} placeholder="enter phone"/>
                            <input type="email" name="email" onKeyPress={this.addEmail} placeholder="enter email"/>
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
                        visibleSections["buttons"] ?
                        <div className="stage country-select">
                            <button type="button">Process Form Information</button>
                        </div> :
                        <span className="hidden"></span>
                    }                    
                </div>
                <div className="footer"></div>
            </div>
        );
    }
}

export default App;
