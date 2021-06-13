import React from 'react'
import Firebase from 'firebase';
import {useState, useEffect} from 'react';
import { Card, Menu , Segment, Button, Icon, Label } from 'semantic-ui-react'

export default function Notification_CA(props) {

    var CAemail = props.dataParentToChild


    const [dbinfo , setdbinfo] = useState([]);

    

    let STRING =[]
  

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
                     if(list[count].includes('ca') && list[count].includes(CAemail))
                     {

                       var string = list[count].replace(']','').replace('[','')

                      //  console.log(string);
                      if(!string.endsWith('}'))
                      {
                        string = string+'}'
                      }
                       var final_json = JSON.parse(string)


                        var PATH = '/'+ final_json.name
                       let ref = Firebase.database().ref(PATH);

                        ref.once('value')
                        .then(function(snapshot) {
                            const exists = snapshot.val() !== null;

                            

                            if (exists) {
                                let data = snapshot.val();

                                const dataArray = Object.values(data);

                                let i=0
                                for(i=0; i<dataArray.length; i++)
                                {
                                    if(dataArray[i].university_certificate!==undefined)
                                    {

                                        STRING.push(<div><Segment>{"ID: "+dataArray[i].university_certificate.id+ ' Registration: '+  dataArray[i].university_certificate.rgstn + ' Roll: '+  dataArray[i].university_certificate.rl
                                        + ' Certificate Type: '+  dataArray[i].university_certificate.value}  <Button as='div' labelPosition='right' floated='right'>
                                        <Button basic color='blue' >
                                          <Icon name='fork' />
                                          Upload
                                        </Button>
                                        <Label as='a' basic color='blue' pointing='left'>
                                          
                                        </Label>
                                      </Button> </Segment> </div>)

                                    }

                                    if(dataArray[i].university_marksheet!==undefined)
                                    {

                                        STRING.push(<div><Segment>{"ID: "+dataArray[i].university_marksheet.id+ ' Registration: '+  dataArray[i].university_marksheet.rgstn + ' Roll: '+  dataArray[i].university_marksheet.rl
                                        + ' Certificate Type: '+  dataArray[i].university_marksheet.value} <Button as='div' labelPosition='right' floated='right'>
                                        <Button basic color='green' >
                                          <Icon name='fork' />
                                          Upload
                                        </Button>
                                        <Label as='a' basic color='green' pointing='left'>
                                          
                                        </Label>
                                      </Button> </Segment> </div>)

                                    }
                                    
                                }

                            }

                            setdbinfo(STRING)

                            
                        
                        })


                      }

                      

                   }
                   

               }
                   
           )
           
           .catch(err => reject(err))
       })

       

    }, [])



    return (
    
        
        <div >
           
            <Menu>
            
            <Card>
            <Card fluid color='red' header='Notifications' />
            </Card>

        </Menu>

        <br/>
            
            {dbinfo}


            </div>


    )

   
}
