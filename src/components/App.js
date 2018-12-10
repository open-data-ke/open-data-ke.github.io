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
            availableCountries: [
                {
                    key: "254",
                    label: "Kenya"
                },
                {
                    key: "255",
                    label: "Tanzania"
                },
                {
                    key: "256",
                    label: "Uganda"
                }
            ],
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
    }

    componentDidMount = () => {
        // TODO:

        // async fetch possible actions
        let possibleActions = [
            {
                id: "a5ab36be-7d74-42b9-8c5e-6c01ddf4dd44",
                description: "get general, open information on a mine in my country"
            },
            {
                id: "65b377f3-db4a-4037-84fc-e711d7348a0d",
                description: "look up jobs and job advertisements at my local mine"
            },
            {
                id: "cac34ed3-4f04-4509-8d23-4567a2d05d83",
                description: "submit a complaint to companies exploiting resources in my area"
            },
        ];

        // Then: >>

        // remap action keys for use in select dropdown
        const actionMapping = {
            id: "value",
            description: "label"
        }

        possibleActions = renameJsonArrayItemKeys(possibleActions, actionMapping);

        this.setState({ possibleActions });
    }

    showHiddenSection = async (sectionToShow) => {
        const visibleSections = this.state.visibleSections;
        console.log(visibleSections);
        if (sectionToShow in visibleSections && !visibleSections[sectionToShow]) {
            visibleSections[sectionToShow] = true;
        }
        await visibleSections;
    }

    listAvailableCountries = async () => {
        // async fetch available countries
        let availableCountries = [
            {
                code: "254",
                name: "Kenya"
            },
            {
                code: "255",
                name: "Tanzania"
            },
            {
                code: "256",
                name: "Uganda"
            },
        ];

        // Then: >>

        // remap country keys for use in select dropdown
        const countryMapping = {
            code: "value",
            name: "label"
        }

        await renameJsonArrayItemKeys(availableCountries, countryMapping);
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
        if(e.value === 'a5ab36be-7d74-42b9-8c5e-6c01ddf4dd44' || e.value === '65b377f3-db4a-4037-84fc-e711d7348a0d' || e.value==='cac34ed3-4f04-4509-8d23-4567a2d05d83'){
            this.setState({
                visibleSections: { // keep these in sequential order of visibility
                    "action-select": true,
                    "phone-email": true,
                    "country-select": false,
                    "buttons": false
                }
            });
        }
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
                            <input type="text" name="phoneOrEmail" onKeyPress={this.addPhone}/>
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
