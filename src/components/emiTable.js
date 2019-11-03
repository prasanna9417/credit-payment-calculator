import React from 'react'
import { Table } from 'reactstrap'

function EMITable(props){
    return(
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Duration(in months)</th>
                        <th>Interest Rate</th>
                        <th>Monthly Payments</th>       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{props.amount}</td>
                        <td>{props.duration}</td>
                        <td>{props.emi.interestRate}</td>
                        <td>{props.emi.monthlyPayment.amount}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}


export default EMITable