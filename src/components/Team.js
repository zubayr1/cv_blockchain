import React from 'react'
import { Grid } from 'semantic-ui-react'
import Fade from 'react-reveal/Fade';

function Team() {
    return (
        <div>
            <Fade left>
            
            <Grid centered>
                    <Grid.Row columns={1}>
                    <div >
                    <h3>Team</h3>
                    </div>
                    </Grid.Row>

                    <Grid.Row columns={1}>
                    <p>
                    
                    This handout will help you understand how paragraphs are formed, how to develop stronger paragraphs, and how to completely and clearly express your ideas.

                    What is a paragraph?
                    Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.

                    How do I decide what to put in a paragraph? 
                    </p>
                    </Grid.Row>
                </Grid>
                <br/>
           
            </Fade>

        </div>
    )
}

export default Team
