import React, { Component } from 'react'
import {Button, Divider, Grid, Image } from 'semantic-ui-react'
import Pulse from 'react-reveal/Pulse';

import getstarted_img from '../images/Get_Started.jpg'

class GetStarted extends Component {

    state = { activeItem: 'Why Paul' }

    handleItemClick = (e) => {
        this.setState({ activeItem: 'login' }, () => {
            
            this.props.onChange(this.state.activeItem)
        })
    }

    
    render(){
        const mystyle = {
            color: "blue",
            padding: "10px",
            fontFamily: "Arial",
            fontStyle: "italic"
          };
    return (
        <div >
        <Pulse>
        <Grid centered>
                    <Grid.Row columns={1}>
                    <div >
                    <Image src={getstarted_img} fluid size='small' />
                    </div>
                    </Grid.Row>

                    <Grid.Row columns={1}>
                    <p style={mystyle}>
                        You are one Step away from the feature!
                        Get Started now
                    </p>

                    </Grid.Row>

                    <Grid.Row columns={1}>
                    
                    <Button inverted color='blue' content='Login' onClick={this.handleItemClick}/>

                    </Grid.Row>
                </Grid>

                <Divider />
                </Pulse>
        </div>
    )
      }
}

export default GetStarted
