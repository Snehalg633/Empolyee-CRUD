
import React, { useEffect, useState } from 'react';

const EmployeeForm = (props) => {

    const [empState, setEmpState] = useState({
        EmployeeName: '',
        EmployeeAddress: "",
        EmployeePhone: "",
        EmployeeEmail: '',
        id: ''
    })

    useEffect(() => {
        const { selectedEmployee } = props;
        setEmpState({ ...selectedEmployee })
    }, [props])

    const handleInputChange = e => {

        if (e.target.name === "EmployeeName") {
            setEmpState({ ...empState, EmployeeName: e.target.value })
        } else if (
            e.target.name === "EmployeeAddress"
        ) {
            setEmpState({ ...empState, EmployeeAddress: e.target.value })
        } else if (
            e.target.name === "EmployeePhone"
        ) {
            setEmpState({ ...empState, EmployeePhone: e.target.value })
        } else if (
            e.target.name === "EmployeeEmail"
        ) {
            setEmpState({ ...empState, EmployeeEmail: e.target.value })
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        setEmpState({
            EmployeeName: '',
            EmployeeAddress: "",
            EmployeePhone: "",
            EmployeeEmail: '',
            id: ''
        })
        props.onAddorEdit(empState)
    }


    return (
        <div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <label> Employee Name* </label>
                <input name="EmployeeName" value={empState.EmployeeName} onChange={handleInputChange} />
                <label> Employee Address</label>
                <input name="EmployeeAddress" value={empState.EmployeeAddress} onChange={handleInputChange} />
                <label> Employee Phone </label>
                <input name="EmployeePhone" value={empState.EmployeePhone} onChange={handleInputChange} />
                <label> Employee Email </label>
                <input name="EmployeeEmail" value={empState.EmployeeEmail} onChange={handleInputChange} />
                <button type="submit" >Submit</button>
            </form>
        </div>
    );
}


export default EmployeeForm;
