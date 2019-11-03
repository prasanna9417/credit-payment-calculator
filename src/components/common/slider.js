import React from 'react'

 
export default class Slider extends React.Component { 
    constructor(props) {
        super(props) 
    }

    handleChange = e => {
        this.props.handleChange({[e.target.name] : e.target.value})
    }
    
    render() {
        return (
            <div>
                <h4>
                    {this.props.min}
                    <input name={this.props.name}  type="range" min={this.props.min} max={this.props.max} onChange={this.handleChange} step={this.props.step}/>               
                    {this.props.max}
                </h4>
            </div> 
        )
    }
}