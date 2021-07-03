import React from 'react'
import {useState, useEffect, } from 'react';

import { Card, Segment, Button, Form,} from 'semantic-ui-react'

export default function Blockchain(props) {


    var email =  props.dataParentToChild

    let STRING =[]

    const [dbinfo , setdbinfo] = useState([]);

    const [usertype , setusertype] = useState([]);

    const [registration , setregistration] = useState([]);
    const [roll , setroll] = useState([]);


    function onSubmit(e)
    {

        new Promise((resolve, reject)=>
        {
            
            fetch(`api/getupld`)
            .then(result => result.json()
            )
            .then(json => 
                {
                    resolve(json)

                    var list = JSON.stringify(json).split('},')

                   var count=0

                   for(count=0; count<list.length; count++)
                   {
                      var string = list[count].replace(']','').replace('[','')

                        //  console.log(string);
                        if(!string.endsWith('}'))
                        {
                          string = string+'}'
                        }
                         var final_json = JSON.parse(string)
  

                        if(final_json.registration==registration && final_json.roll == roll)
                        {

                            if(final_json.check==='VERIFICATION DONE')
                            {
                                STRING.push(<div><Segment inverted > <p style={{ color: 'green' }}>{"ID: "+final_json.id+ ' Certificate Type: '+  final_json.doctype + " Hash Value: " + final_json.hash + " Check: " + final_json.check}</p>  </Segment> </div>)
    
                            }
                            else if(final_json.check==='VERIFICATION FAILED')
                            {
                                STRING.push(<div><Segment inverted> <p style={{ color: 'red' }}>{"ID: "+final_json.id+ ' Certificate Type: '+  final_json.doctype + " Hash Value: " + final_json.hash + " Check: " + final_json.check}</p>  </Segment> </div>)
    
                            }
                            else
                            {
                                STRING.push(<div><Segment inverted> <p style={{ color: 'yellow' }}>{"ID: "+final_json.id+ ' Certificate Type: '+  final_json.doctype + " Hash Value: " + final_json.hash + " Check: " + final_json.check}</p>  </Segment> </div>)
    
                            }
                        }

                       
                       


                     

                    }

                    setdbinfo(STRING)

                    

                })
                
            }
        )

    }

    useEffect(()=>
    {

        new Promise((resolve, reject)=>
        {
            fetch(`api/doc`)
            .then(result => result.json()
            )
            .then(json =>
            {
                resolve(json)

                    var list = JSON.stringify(json).split('},')

                   var count=0

                   for(count=0; count<list.length; count++)
                   {
                    if( list[count].includes(email))
                    {
                        var string = list[count].replace(']','').replace('[','')

                        //  console.log(string);
                        if(!string.endsWith('}'))
                        {
                          string = string+'}'
                        }
                         var final_json = JSON.parse(string)


                         setusertype(final_json.usertype)
  
                    }

                   }

            })
        })

        new Promise((resolve, reject)=>
        {
            
            fetch(`api/getupld`)
            .then(result => result.json()
            )
            .then(json => 
                {
                    resolve(json)

                    var list = JSON.stringify(json).split('},')

                   var count=0

                   for(count=0; count<list.length; count++)
                   {
                      var string = list[count].replace(']','').replace('[','')

                        //  console.log(string);
                        if(!string.endsWith('}'))
                        {
                          string = string+'}'
                        }
                         var final_json = JSON.parse(string)
  


                        if(final_json.check==='VERIFICATION DONE')
                        {
                            STRING.push(<div><Segment inverted > <p style={{ color: 'green' }}>{"ID: "+final_json.id+ ' Certificate Type: '+  final_json.doctype + " Hash Value: " + final_json.hash + " Check: " + final_json.check}</p>  </Segment> </div>)

                        }
                        else if(final_json.check==='VERIFICATION FAILED')
                        {
                            STRING.push(<div><Segment inverted> <p style={{ color: 'red' }}>{"ID: "+final_json.id+ ' Certificate Type: '+  final_json.doctype + " Hash Value: " + final_json.hash + " Check: " + final_json.check}</p>  </Segment> </div>)

                        }
                        else
                        {
                            STRING.push(<div><Segment inverted> <p style={{ color: 'yellow' }}>{"ID: "+final_json.id+ ' Certificate Type: '+  final_json.doctype + " Hash Value: " + final_json.hash + " Check: " + final_json.check}</p>  </Segment> </div>)

                        }



                     

                    }

                    setdbinfo(STRING)

                    

                })
                
            }
        )


    },[]
    )


    let un_props
    
    if(usertype=='un')
    {
        un_props= <div>

        <Segment raised padded>
        <Form>
            
            <Form.Input fluid label='Registration No.' placeholder='Registration Number' value ={registration} onChange={e => setregistration(e.target.value)}/>
            <Form.Input fluid label='Roll No.' placeholder='Roll Number' value ={roll} onChange={e => setroll(e.target.value)}/>
            <Button onClick={onSubmit}>Submit</Button>
            
             
       
      </Form>
      </Segment>
        </div>
    }
    else
    {
        un_props= <div></div>
    }


    return (
        <div>
            <Card>
              <Card fluid color='red' header='Blockchain' />
            </Card>
            {un_props}
            <Segment stacked inverted >{dbinfo}</Segment>
        </div>
    )
}
