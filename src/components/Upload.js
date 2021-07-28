import {useState, useEffect} from 'react';
import storage from '../firebase_storage';
import { Button, Header, Icon, Segment, Form, Dropdown, Message } from 'semantic-ui-react'

import { sha256, } from 'js-sha256';

import UpldAPI from './upload_api'

import Firebase from 'firebase';



function Upload(props) {


const [doc , setDoc] = useState('');

const [value , setValue] = useState('');

const [CA, setCA] = useState('');

const [check, setcheck] = useState(0)


const [HASHEDCONTENT, setHASHEDCONTENT] = useState('')


let fileReader;

var list = props.dataParentToChild.split(' ')


const options=[]

useEffect(()=>
      {
         //get only ca...
      
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

                  var dropdownlist_count=0
                   for(count=0; count<list.length; count++)
                   {
                     
                     if(list[count].includes('ca'))
                     {
                      

                       var string = list[count].replace(']','').replace('[','')
                      if(!string.endsWith('}'))
                      {
                        string = string+'}'
                      }
                       var final_json = JSON.parse(string)


                       if(final_json.usertype==='ca'){
                        dropdownlist_count+=1
                        options.push({key:dropdownlist_count, text: final_json.name, value: dropdownlist_count})

                       }

                     }

                   }
                   

               }
                   
           )
           .catch(err => reject(err))
       })
      }, [options])
       // return false
       
async function upload(){
if(doc === null)
	return;

if(doc==='')
  return;
if(value==='')
  return;


  setcheck(3)
  storage.ref(`/documents/${list[0]}/${value}`).put(doc)
            

             
  const id = Math.floor(Math.random() * 1000000)
  UpldAPI.create(`{"id": "${id}", "registration":"${list[1]}", "roll":"${list[2]}", "catype":"${CA}", "doctype":"${value}", "check":"false", "hash":"${HASHEDCONTENT}"}`)
  .then(upld =>{
    console.log('success', upld);

    var rgstn = list[1]

    var rl = list[2]

    var PATH = '/'+ CA + '/'+ rgstn+'/'+ value

    Firebase.database()
      .ref(PATH)
      .set({
        id,
        rgstn,
        rl,
        value
      });

    setcheck(1)
  })
  
  

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

const handleChange = (e) =>
{
  setValue(e)
}


const handledropdown =(e)=>
{
  setCA(e.target.innerHTML.replace('<span class="text">','').replace('</span>', ''))
}



let button

if(CA==='' || doc==='' || value==='' )
{
  button = <Button disabled onClick={upload}>Upload</Button>
}
else
{
  button = <Button onClick={upload}>Upload</Button>
}

let message

if(check===1)
{
  message=
  <Message positive>
  <Message.Header>SUCCESS</Message.Header>
  <p>
   The file is successfully uploaded
  </p>
</Message>
}
else if(check===3)
{
  message =
  <Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Just a moment</Message.Header>
      Uploading on Progress...
    </Message.Content>
  </Message>
}

return (
	<div className="App">
    
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
          <Form.Input fluid label='Registration No.' placeholder='Registration Number' value ={list[1]} disabled/>
          <Form.Input fluid label='Roll No.' placeholder='Roll Number' value ={list[2]} disabled/>
          
        </Form.Group>
      </Form>
      <Dropdown placeholder='Select CA' clearable options={options} selection onChange={handledropdown}/>
      <br/>
	{button}

  <br/>

  {message}

  </Segment>
	</div>
);
}

export default Upload;
