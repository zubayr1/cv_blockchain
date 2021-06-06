import React , {useState} from 'react'
import {  Grid, Image, Button, Divider } from 'semantic-ui-react'
import blockchain_img from '../images/education_1.png'

function WhyPaul() {

    const [flag, setflag] =  useState(0)

    const style= {colorBlue: "#213865", colorp: "#9EA9BE"};

    let window
    if(flag===0)
    {
        window=<div>
            <p style={{color: style.colorp}}>
                        A blockchain is a growing list of records, called blocks, that are linked using cryptography.[1][2][3][4] Each block contains a cryptographic hash of the previous block,[4] a timestamp, and transaction data (generally represented as a Merkle tree). By design, a blockchain is resistant to modification of its data. This is because once recorded, the data in any given block cannot be altered retroactively without alteration of all subsequent blocks.
            </p>
            <Button color='teal' onClick={()=> setflag(1)}>Show More</Button>
        </div>
    }
    else
    {
        window=<div>
        <p style={{color: style.colorp}}>
                    A blockchain is a growing list of records, called blocks, that are linked using cryptography.[1][2][3][4] Each block contains a cryptographic hash of the previous block,[4] a timestamp, and transaction data (generally represented as a Merkle tree). By design, a blockchain is resistant to modification of its data. This is because once recorded, the data in any given block cannot be altered retroactively without alteration of all subsequent blocks.
                    A blockchain is a growing list of records, called blocks, that are linked using cryptography.[1][2][3][4] Each block contains a cryptographic hash of the previous block,[4] a timestamp, and transaction data (generally represented as a Merkle tree). By design, a blockchain is resistant to modification of its data. This is because once recorded, the data in any given block cannot be altered retroactively without alteration of all subsequent blocks.
                    A blockchain is a growing list of records, called blocks, that are linked using cryptography.[1][2][3][4] Each block contains a cryptographic hash of the previous block,[4] a timestamp, and transaction data (generally represented as a Merkle tree). By design, a blockchain is resistant to modification of its data. This is because once recorded, the data in any given block cannot be altered retroactively without alteration of all subsequent blocks.

        </p>
        <Button color='blue' size='small' onClick={()=> setflag(0)}>Show Less</Button>
    </div>
    }
    return (
        <div>

        
            <Grid columns={2} centered textAlign='center'>
            

            
            <Grid.Column floated='left' width={8}>
                <div >
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>            
                <Grid   >
                    <Grid.Row columns={1}>
                    <div>
                    <h1 style={{color: style.colorBlue}}>Why Paul?</h1>
                    </div>
                    </Grid.Row>

                    <Grid.Row columns={1}>
                    {window}
                    </Grid.Row>
                </Grid>
                </div>
                </div>
            </Grid.Column>

            <Grid.Column floated='right' width={7}> 
                <p>
                <Image src={blockchain_img}  size='big'/>
                </p>
                <Divider/>
                
            </Grid.Column>
            
            </Grid>

          
        </div>
    )
}

export default WhyPaul
