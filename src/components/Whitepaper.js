import React from 'react'
import { Button, Header, Icon, Segment, Grid } from 'semantic-ui-react'

function Whitepaper() {
    return (
        <div>
            <Segment placeholder>
                
                
                <Grid centered>
                        <Grid.Row columns={1}>
                        <div >
                        <h2>White Paper</h2>
                        <h4>Abstract</h4>
                        </div>
                        </Grid.Row>

                        <Grid.Row columns={1}>
                        <p>
                        
                            A blockchain is a growing list of records, called blocks, that are linked using cryptography.[1][2][3][4] Each block contains a cryptographic hash of the previous block,[4] a timestamp, and transaction data (generally represented as a Merkle tree). By design, a blockchain is resistant to modification of its data. This is because once recorded, the data in any given block cannot be altered retroactively without alteration of all subsequent blocks.
                            One key difference between a typical database and a blockchain is the way the data is structured. A blockchain collects information together in groups, also known as blocks, that hold sets of information. Blocks have certain storage capacities and, when filled, are chained onto the previously filled block, forming a chain of data known as the “blockchain.” All new information that follows that freshly added block is compiled into a newly formed block that will then also be added to the chain once filled.
                        </p>
                        </Grid.Row>
                    </Grid>


                <Header icon>
                <Icon name='pdf file outline' />
                Read the full white paper from here
                </Header>
                <Button primary>Download PDF</Button>
            </Segment>
        </div>
    )
}

export default Whitepaper
