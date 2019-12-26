import React, { Component } from 'react';
import '../styles/table.css';
import { BrowserRouter, Link, Switch, Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import axios from 'axios';
import Pagination from './pagination';
import User from '../views/User';
import Button from './button';

class Table extends React.Component<RouteComponentProps> {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.state = {
            pageOfItems: [],
            error: null,
            tableHeader: ["id", "name", "age", "email", "position", "phone", "edit", "delete"],
            dataRes: [
                { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com', position: '', phone: '' },
                { id: 2, name: 'Ali', age: 19, email: 'ali@email.com', position: '', phone: '' },
                { id: 3, name: 'Saad', age: 16, email: 'saad@email.com', position: '', phone: '' },
                { id: 4, name: 'Asad', age: 25, email: 'asad@email.com', position: '', phone: '' }
            ]
        }
    }
    delete(id) {
        axios.get('http://localhost:3000/delete/' + id)
            .then()
            .catch(err => console.log(err))
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    editCustommer(id) {
        this.props.history.push(`/user/${id}`)
    }
    renderTableData() {
        return this.props.dataRes.map(item => {
            return (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.email}</td>
                    <td>{item.position}</td>
                    <td>{item.phone}</td>
                    <td>
                        <Button onClick={() => this.editCustommer(item.id)} label={"Edit"} color={"secondary"} variant={'contained'}></Button>
                    </td>
                    <td>
                        <Button onClick={() => this.delete(item.id)} label={'delete'} color={"primary"} variant={'contained'}></Button>
                    </td>
                </tr >
            )
        })
    }
    renderTableHeader() {
        let header = this.state.tableHeader;
        return header.map(items => {
            return <th key={items}>{items.toUpperCase()}</th>
        })
    }

    render() {
        const { error, dataRes } = this.state;
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            return (
                <div>
                    <table id='students'>
                        <thead>
                            <tr>
                                {this.renderTableHeader()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                    <Pagination items={this.state.dataRes} onChangePage={this.onChangePage} />
                </div>
            )
        }
    }
}

export default Table;
