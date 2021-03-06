import * as React from 'react';
import HomeProps from './HomeProps';
import HomeState from './HomeState';
import { RecordInterface, Record } from '../../models/Record';
import Nav from '../Nav';
import './Home.scss';

export default class Home extends React.Component<HomeProps, HomeState> {
    state = {
        expenses: [] as RecordInterface[]
    };
    componentDidMount() {
        // tslint:disable-next-line:no-console
        console.log(this.state.expenses);
        // tslint:disable-next-line:no-console
        fetch('/api').then(res => res.json()).then((result: RecordInterface[]) => {
            const expenses: RecordInterface[] = [];
            result.map((record) => expenses.push(new Record(record.amount, record.type)));
            this.setState({expenses});
        });
    }
    renderData() {
        return this.state.expenses.map(item => (<div key={item.amount}>Amount: {item.amount}</div>));
    }
    render() {
        return (
            <div className="home">
                <Nav/>
                {this.state.expenses.length && this.renderData()}
            </div>
        );
    }
}
