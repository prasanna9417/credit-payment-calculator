import React from 'react'
import { Table } from 'reactstrap'
import { Button, ButtonToolbar } from 'reactstrap'

export default class History extends React.Component{
    constructor(props) {
        super(props) 
    }

    handleClick = e => {
        this.props.handleRow(e.target.id)
    }
    render(){
        return(
            <div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Duration(in months)</th>
                            <th>Get Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.emi.map(( value, index ) => {
                        return(
                            <tr key={index}>
                                <td>{value.principal.amount}</td>
                                <td>{value.numPayments}</td>
                                <td>
                                <ButtonToolbar>
                                    <Button variant="dark" id={index} onClick={this.handleClick}>Details</Button>
                                </ButtonToolbar>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            
            </div>
        )
    }
}


