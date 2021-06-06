import React from 'react'
import { Segment, Grid, Image } from 'semantic-ui-react'

import blockchain_img from '../images/hacking.png'

function SecurityInfo() {
    return (
        <div >
        <Segment secondary>
        <Grid centered>
                    <Grid.Row columns={1}>
                    <div >
                    <Image src={blockchain_img} fluid size='small' circular/>
                    </div>
                    </Grid.Row>

                    <Grid.Row columns={1}>
                    <p>
                    
                        A blockchain is a growing list of records, called blocks, that are linked using cryptography.[1][2][3][4] Each block contains a cryptographic hash of the previous block,[4] a timestamp, and transaction data (generally represented as a Merkle tree). By design, a blockchain is resistant to modification of its data. This is because once recorded, the data in any given block cannot be altered retroactively without alteration of all subsequent blocks.
                        One key difference between a typical database and a blockchain is the way the data is structured. A blockchain collects information together in groups, also known as blocks, that hold sets of information. Blocks have certain storage capacities and, when filled, are chained onto the previously filled block, forming a chain of data known as the “blockchain.” All new information that follows that freshly added block is compiled into a newly formed block that will then also be added to the chain once filled.
                    </p>
                    </Grid.Row>
                </Grid>
        </Segment>
            
        </div>
    )
}

export default SecurityInfo
