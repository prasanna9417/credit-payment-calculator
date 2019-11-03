import React from 'react'
import Slider from './common/slider'
import axios from '../config/axios'
import { Badge } from 'reactstrap'
import { Spinner } from 'reactstrap'
import EMITable from './emiTable'
import History from './history'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css'
import { Button, ButtonToolbar } from 'reactstrap'
 
export default class SliderInput extends React.Component { 
    constructor(props) {
        super(props) 
        this.state = {
            amount:500,
            duration:24,
            emi:{},
            isLoading : true,
            creditHistory:[]
        }
    }

    handleChange =(e) => {
        //console.log(e)
        this.setState(e,()=>{
            //console.log(e,this.state)
            axios.get(`/interest?amount=${this.state.amount}&numMonths=${this.state.duration}`)
            .then(response => {
                const emi = response.data
                //console.log(emi)
                this.setState({emi,isLoading:false},()=>{
                    if(localStorage.getItem('creditHistory')){
                        console.log('yes')
                        const creditHistory = JSON.parse(localStorage.getItem('creditHistory'))
                        creditHistory.push(this.state.emi)
                        this.setState({creditHistory},()=>{
                            localStorage.setItem('creditHistory',JSON.stringify(creditHistory))
                        })
                        
                    }
                    else{
                        console.log('no')
                        const creditHistory=[]
                        creditHistory.push(this.state.emi)
                        console.log(creditHistory)
                        this.setState({creditHistory},()=>{
                            localStorage.setItem('creditHistory',JSON.stringify(creditHistory))
                        })
                    }
                })
            })
        })
    }

    handleClick=()=>{
        console.log('clear')
        this.setState({creditHistory:[]})
        localStorage.clear()
    }

    handleRow=(e)=>{
        const creditHistory = JSON.parse(localStorage.getItem('creditHistory'))
        const targetValue=creditHistory[Number(e)]
        console.log(targetValue)
        this.setState({amount:targetValue.principal.amount, duration:targetValue.numPayments},()=>{
            axios.get(`/interest?amount=${this.state.amount}&numMonths=${this.state.duration}`)
            .then(response => {
                const emi = response.data
                //console.log(emi)
                this.setState({emi,isLoading:false},()=>{
                    console.log(this.state)
                })
            })  
        })
    }

    componentDidMount(){
        console.log('component mounted')
        axios.get(`/interest?amount=${this.state.amount}&numMonths=${this.state.duration}`)
        .then(response => {
            const emi = response.data
            //console.log(emi)
            this.setState({emi,isLoading:false},()=>{
                //console.log(this.state)
                if(localStorage.getItem('creditHistory')){
                    console.log('yes')
                    const creditHistory = JSON.parse(localStorage.getItem('creditHistory'))
                    creditHistory.push(this.state.emi)
                    this.setState({creditHistory},()=>{
                        localStorage.setItem('creditHistory',JSON.stringify(creditHistory))
                    })
                    
                }
            })
        })
    }
    
    render() {
        return (
            <SplitterLayout>
                    <div>
                        <br/>
                        <h1><Badge color="dark">Payment Calculator</Badge></h1><br/>
                        <h2><Badge color="dark">Credit Amount</Badge></h2><br/>
                        <Slider handleSubmit={this.handleSubmit} name="amount"  min="500" max="5000" handleChange={this.handleChange} step="1"/>
                        <h4>{this.state.amount}</h4><br/>
                        <h2><Badge color="dark">Duration(in months)</Badge></h2><br/>
                        <Slider handleSubmit={this.handleSubmit} name="duration" min="6" max="24" handleChange={this.handleChange} step="1"/>
                        <h4>{this.state.duration}</h4><br/>
                        {this.state.isLoading? (<Spinner type="grow" color="dark" />):(
                            <EMITable amount={this.state.amount} duration={this.state.duration} emi={this.state.emi}/>
                        )}
                        <ButtonToolbar>
                            <Button variant="dark" onClick={this.handleClick}>Reset History</Button>
                        </ButtonToolbar>
                    </div> 
                    <div><History emi={this.state.creditHistory} handleRow={this.handleRow}/></div>
            </SplitterLayout>
        )
    }
}