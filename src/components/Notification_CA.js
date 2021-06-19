import React from 'react'
import Firebase from 'firebase';
import {useState, useEffect} from 'react';
import { Card, Menu , Segment, Button, Icon, Label, Form, Header } from 'semantic-ui-react'
import { sha256, } from 'js-sha256';
import UpldAPI from './upload_api'

export default function Notification_CA(props) {

 
    
    var CAemail =  props.dataParentToChild

    const [CAname , setCAname] = useState('');

    let fileReader;

    const [doc , setDoc] = useState('');


    const [dbinfo , setdbinfo] = useState([]);

    const [HASHEDCONTENT, setHASHEDCONTENT] = useState('')
    const [value , setValue] = useState('');

    const [registr, setregistr] = useState('')

    const [rolln, setrolln] = useState('')

    let STRING =[]

    const handleregistrChange = (e) =>
    {
      setregistr(e.target.value)
    }

    const handlerollChange = (e) =>
    {
      setrolln(e.target.value)
    }

    const handleChange = (e) =>
    {
      setValue(e)
    }


    
    const handleFileChosen = (file) => {
      setDoc(file)
      fileReader = new FileReader();
      try{
          fileReader.onloadend = handleFileRead;
          fileReader.readAsText(file);
      }catch(e)
      {

      }
      
    };

    const handleFileRead = (e) => {
    const content = fileReader.result;
    // … do something with the 'content' …

    setHASHEDCONTENT(sha256(content));

    };

   function handleuploadClick()
    {
      console.log(registr);
      console.log(rolln);
      console.log(value);
      console.log(HASHEDCONTENT);

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
                     if(list[count].includes(registr) && list[count].includes(rolln)  && list[count].includes(value) && list[count].includes(CAname) && list[count].includes('false'))
                     {
                      var string = list[count].replace(']','').replace('[','')

                      


                      if(!string.endsWith('}'))
                      {
                        string +='}'
                      }


                      var final_json = JSON.parse(string)



                      if(final_json.hash===HASHEDCONTENT)
                      {
                        UpldAPI.update(`{"id": "${final_json.id}", "registration":"${final_json.registration}", "roll":"${final_json.roll}", "catype":"${CAname}", "doctype":"${value}", "check":"VERIFICATION DONE", "hash":"${final_json.hash}"}`)
                      .then(upld =>{
                        // console.log('success', upld);

                        alert("Success! Student will be notified")

                       

                        var PATH = '/'+ CAname + '/'+ final_json.registration+'/'+ value

                        let useref = Firebase.database().ref(PATH)

                        useref.remove()

                        var STPATH = '/'+ final_json.registration + '/'+ CAname+'/'+ value

                        var output='SUCCESSFUL'

                        Firebase.database()
                          .ref(STPATH)
                          .set({
                            CAname,
                            value,
                            output
                          });
                                              

                      })
  
                      }
                      else
                      {
                        UpldAPI.update(`{"id": "${final_json.id}", "registration":"${final_json.registration}", "roll":"${final_json.roll}", "catype":"${CAname}", "doctype":"${value}", "check":"VERIFICATION FAILED", "hash":"${final_json.hash}"}`)
                      .then(upld =>{
                        // console.log('failed', upld);

                        alert("Verification failed! Student will be notified")

                       

                        var PATH = '/'+ CAname + '/'+ final_json.registration+'/'+ value

                        let useref = Firebase.database().ref(PATH)

                        useref.remove()


                        var STPATH = '/'+ final_json.registration + '/'+ CAname+'/'+ value

                        var output='FAILED'

                        Firebase.database()
                          .ref(STPATH)
                          .set({
                            CAname,
                            value,
                            output
                          });

                      })
                        
                      }

                     }

                    }


            }
          )
         
      })
      
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
                     if(list[count].includes('ca') && list[count].includes(CAemail))
                     {

                       var string = list[count].replace(']','').replace('[','')

                      //  console.log(string);
                      if(!string.endsWith('}'))
                      {
                        string = string+'}'
                      }
                       var final_json = JSON.parse(string)

                       setCAname(final_json.name)

                      //  console.log(final_json.name);


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
                                        + ' Certificate Type: '+  dataArray[i].university_certificate.value}  <Button as='div' labelPosition='right' floated='right'onClick={()=> console.log(STRING)}>
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

    let button

    if(registr==='' || rolln==='' || doc==='' || value==='')
    {
      button = <Button disabled onClick={handleuploadClick}>Upload</Button>
    }
    else
    {
      button = <Button onClick={handleuploadClick}>Upload</Button>
    }


    return (
    
        
        <div >
           
            <Menu>
            
            <Card>
            <Card fluid color='red' header='Notifications' />
            </Card>

        </Menu>

        <br/>
            
            {dbinfo}

            <br/>

            <Segment placeholder>
  <Header icon>
      <Icon name='pdf file outline' />
      </Header>
	<input type="file" onChange={(e)=>handleFileChosen(e.target.files[0])}/>
  <br/>
  <Form>
  <label>Document Type</label>
        <Form.Group inline>
          
          <Form.Radio
            label='University Certificate'
            value='university_certificate'
            checked={value === 'university_certificate'}
            onChange={(e)=>handleChange('university_certificate')}
          />
          <Form.Radio
            label='University Marksheet'
            value='university_marksheet'
            checked={value === 'university_marksheet'}
            onChange={(e)=>handleChange('university_marksheet')}
          />
         
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Registration No.' placeholder='Registration Number' value ={registr} onChange={handleregistrChange}/>
          <Form.Input fluid label='Roll No.' placeholder='Roll Number' value ={rolln} onChange={handlerollChange}/>
          
        </Form.Group>
      </Form>
      <br/>
	
  {button}

  <br/>


  </Segment>


            </div>


    )

   
}
