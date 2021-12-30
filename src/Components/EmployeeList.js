import React, { Component } from "react";
import EmployeeForm from "./EmployeeForm";

class EmployeeList extends Component {
    constructor() {
        super()
        this.state = {
            list: this.returnList(),
            currentIndex: -1,
            selectedEmployee: {}
        }
    }
    returnList = () => {
        if (localStorage.getItem("list") === null)
            localStorage.setItem("list", JSON.stringify([]))
        return JSON.parse(localStorage.getItem("list"))
    }
    onAddorEdit = (data) => {
        let list = this.returnList()
        const idExist = list.filter((el) => el.id === data.id).length;
        if (idExist) {
            console.log(idExist)
            list = list.map(em => {
                if (em.id === data.id) {
                    em = { ...data }
                    console.log(em)
                }
                return em
            })
        } else {
            data['id'] = list.length;
            list.push(data)
        }
        this.setState({ selectedEmployee: {} })
        localStorage.setItem("list", JSON.stringify(list))
        this.setState({ list })
    }

    handleEdit = index => {
        this.setState({ selectedEmployee: this.state.list.filter((_, ind) => ind === index)[0] })
        this.setState({ currentIndex: index })
    }

    deleteRecord = index => {
        const listArr = this.state.list;
        const newArr = listArr.filter((e, ind) => ind != index)
        this.setState({ list: newArr });
        localStorage.setItem("list", JSON.stringify(newArr))
    }

    render() {
        return (
            <div>
                <EmployeeForm
                    onAddorEdit={this.onAddorEdit}
                    currentIndex={this.state.currentIndex}
                    list={this.state.list}
                    selectedEmployee={this.state.selectedEmployee}
                />
                <hr />
                <p>Employee List</p>
                <table border="1">
                    <thead>
                        <th> Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {
                            this.state.list.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.EmployeeName}</td>
                                    <td>{item.EmployeeAddress}</td>
                                    <td>{item.EmployeePhone}</td>
                                    <td>{item.EmployeeEmail}</td>
                                    <td>
                                        <button onClick={() => this.handleEdit(index)}>Edit</button>
                                        <button onClick={() => this.deleteRecord(index)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default EmployeeList;