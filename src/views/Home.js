import React, { useState, useCallback, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import User from './User';
import Table from '../components/table';
import Button from '../components/button';
import {
    BrowserRouter as Router, Switch,
    Route,
    Link, Redirect
} from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

class Home extends React.Component<RouteComponentProps> {
    // useEffect(() => {
    //     getDataProduct();
    // }, [])
    // const [dataRes, setDataRes] = useState([]);
    // const getDataProduct = async () => {
    //     const resData = await fetch(
    //         "http://localhost:3000/products"
    //     );
    //     const items = await resData.json();
    //     console.table(items.data.map(item => {
    //         return item;
    //     }));
    //     setDataRes(items.data);
    // }
    constructor(props) {
        super(props);
        this.state = {
            dataRes: [
                { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com', position: '', phone: '' },
                { id: 2, name: 'Ali', age: 19, email: 'ali@email.com', position: '', phone: '' },
                { id: 3, name: 'Saad', age: 16, email: 'saad@email.com', position: '', phone: '' },
                { id: 4, name: 'Asad', age: 25, email: 'asad@email.com', position: '', phone: '' }
            ],
            tableHeader: ["id", "name", "age", "email", "position", "phone", "edit", "delete"]
        }
    }
    addNew() {
        this.props.history.push(`/user`)
    }
    render() {
        return (
            <div className='App' >
                <h1>Customer List</h1>
                <Button variant={'contained'} label={"Add new"} color={'primary'} onClick={this.addNew}></Button>
                <Table dataRes={this.state.dataRes} tableHeader={this.state.tableHeader} history={this.props.history} />
            </div>
        );
    }
}
export default Home;