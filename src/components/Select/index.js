import React, {Component} from 'react';

export default class Select extends Component {
    renderItems = (item, mapping) => <li key={item[mapping.key]}>{item[mapping.value]}</li>;

    render() {
        const { listItems, mapping } = this.props;

        return (
            <ul>{listItems.map(item => this.renderItems(item, mapping))}</ul>
        );
    }
}
