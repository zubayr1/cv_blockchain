import React from 'react'
import {useState, useEffect} from 'react';

import Firebase from 'firebase';
import { Card, Menu , Segment, Button, } from 'semantic-ui-react'

export default function NotificationSt(props) {

    var STemail =  props.dataParentToChild

    let STRING =[]

    let OWNSTRING =[]

    const [dbinfo , setdbinfo] = useState([]);
    const [owndbinfo , setowndbinfo] = useState([]);

    const [stRegistration, setSTregistration] = useState('')

    const [stRoll, setSTRoll] = useState('')


    const handleuploadClick = () =>
    {
        var PATH = '/'+ stRegistration

        console.log(stRegistration);

        let useref = Firebase.database().ref(PATH)

        useref.remove()



    }

    useEffect(()=>
    {


        new Promise((resolve, reject)=>
        {
            var reg
            var rl
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
                     if(list[count].includes('st') && list[count].includes(STemail))
                     {
                        var string = list[count].replace(']','').replace('[','')

                        //  console.log(string);
                        if(!string.endsWith('}'))
                        {
                          string = string+'}'
                        }
                         var final_json = JSON.parse(string)

                         reg = final_json.registration

                         rl = final_json.roll
                    }
                }
            })
            .then(json => 
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
  
                        //  console.log(final_json);
                        if(final_json.registration==reg && final_json.roll == rl)
                        {

                            

                            if(final_json.check==='VERIFICATION DONE')
                            {
                                OWNSTRING.push(<div><Segment  raised> <p style={{ color: 'green' }}>{"ID: "+final_json.id+ ' Registration: '+ final_json.registration+ " Roll: "+ final_json.roll + ' Certificate Type: '+  final_json.doctype + " Hash Value: " + final_json.hash + " Check: " + final_json.check}</p>  </Segment> </div>)
    
                            }
                            else if(final_json.check==='VERIFICATION FAILED')
                            {
                                OWNSTRING.push(<div><Segment raised> <p style={{ color: 'red' }}>{"ID: "+final_json.id+ ' Registration: '+ final_json.registration+ " Roll: "+ final_json.roll +' Certificate Type: '+  final_json.doctype + " Hash Value: " + final_json.hash + " Check: " + final_json.check}</p>  </Segment> </div>)
    
                            }
                            else
                            {
                                OWNSTRING.push(<div><Segment raised> <p style={{ color: 'yellow' }}>{"ID: "+final_json.id+ ' Registration: '+ final_json.registration+ " Roll: "+ final_json.roll +' Certificate Type: '+  final_json.doctype + " Hash Value: " + final_json.hash + " Check: " + final_json.check}</p>  </Segment> </div>)
    
                            }
                        }

                       
                       


                     

                    }

                    setowndbinfo(OWNSTRING)

                    

                })

            })
                
            }
        )




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
                     if(list[count].includes('st') && list[count].includes(STemail))
                     {
                        var string = list[count].replace(']','').replace('[','')

                        //  console.log(string);
                        if(!string.endsWith('}'))
                        {
                          string = string+'}'
                        }
                         var final_json = JSON.parse(string)
  


                         var PATH = '/'+ final_json.registration

                         setSTregistration(final_json.registration)

                         setSTRoll(final_json.roll)

                         
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

                                             STRING.push(<div><Segment>{"Certificate Verification from "+dataArray[i].university_certificate.CAname+ ' for '+  dataArray[i].university_certificate.value + ' is ' +  dataArray[i].university_certificate.output}   </Segment> </div>)

                                         }
                                         if(dataArray[i].university_marksheet!==undefined)
                                         {

                                             STRING.push(<div><Segment>{"Certificate Verification from "+dataArray[i].university_marksheet.CAname+ ' for '+  dataArray[i].university_marksheet.value + ' is ' +  dataArray[i].university_marksheet.output}   </Segment> </div>)

                                         }

                                     }
     
     
                                 }

                                 setdbinfo(STRING)

     
                             }
                             )




                     }

                    }

                    

                })
                
            }
        )


    },[]
    )



    return (
        <div>
            <h3>Private Information</h3>
             {owndbinfo}
             <Menu>

                 
             
            <Card>

                
            <Card fluid color='blue' header='Notifications' />
            
            </Card>
            


            <Menu.Menu position='right'>
            <Menu.Item>
            <Button inverted color='blue' onClick={handleuploadClick} >Remove All</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

            {dbinfo}
        </div>
    )
}
