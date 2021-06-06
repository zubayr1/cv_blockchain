import React from 'react'
import '../Styling.css'
import Fade from 'react-reveal/Fade';
import { Grid, Divider, Image } from 'semantic-ui-react'
import blockchain_img from '../images/why.png'

function About() {

    const style= {colorBlue: "#213865", colorp: "#9EA9BE", textAlign:'right'};

    


    return (
        <div>
        <Fade top>
        <div>
    
        <Grid columns={2} centered textAlign='center'>
        
        <Grid.Column floated='left' width={8} padded> 
            <p>
            <Image src={blockchain_img}  size='large'/>
            </p>
            <Divider/>
            
        </Grid.Column>
        
        <Grid.Column floated='right' width={8} padded>
            <div >
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>            
            <Grid   >
                <Grid.Row columns={1}>
                <div >
                <h1 style={{color: style.colorBlue, textAlign: style.textAlign}}>About</h1>
                </div>
                </Grid.Row>

                <Grid.Row columns={1}>
                <p style={{color: style.colorp}}>
                A blockchain is a growing list of records, called blocks, that are linked using cryptography.[1][2][3][4] Each block contains a cryptographic hash of the previous block,[4] a timestamp, and transaction data (generally represented as a Merkle tree). By design, a blockchain is resistant to modification of its data. This is because once recorded, the data in any given block cannot be altered retroactively without alteration of all subsequent blocks.
                </p>  
                </Grid.Row>
            </Grid>
            </div>
            </div>
        </Grid.Column>

       
        
        </Grid>

      
    </div>

           
            </Fade>
            <Divider/>
        </div>
    )
}

export default About
