import {useState, useEffect} from 'react';
import storage from '../firebase_storage';
import { Button, Header, Icon, Segment, Form, Dropdown, Message } from 'semantic-ui-react'

function Upload(props) {

const [doc , setDoc] = useState('');

const [value , setValue] = useState('');

const [CA, setCA] = useState('');

const [registration, setRegistration] = useState('');

const [roll, setRoll] = useState('');

const [details_check, setDetails_check] = useState(0)


let fileReader;



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
                      dropdownlist_count+=1

                       var string = list[count].replace(']','')
                      if(!string.endsWith('}'))
                      {
                        string = string+'}'
                      }
                       var final_json = JSON.parse(string)
                       options.push({key:dropdownlist_count, text: final_json.name, value: dropdownlist_count})
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

                
                  var string = list[count]
                 
                 if(string.includes(registration) && string.includes(roll)){

                  setDetails_check(1)
                 }
                  

                }
               
                
                if(count===list.length && details_check==0)
                {
                  setDetails_check(2)
                }

              

          }
              
      )
      .then( value=>
        {
          console.log(details_check);
          if(details_check===1){
            storage.ref(`/documents/${props.dataParentToChild}/${value}`).put(doc)
            .then(function (snapshot) {
            
              console.log(11);
            
            // window.location.reload()
          }
            )
          }
          

        }
      )
      .catch(err => reject(err))
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
// console.log(content)
// … do something with the 'content' …
};

const handleChange = (e) =>
{
  setValue(e)
}


const handledropdown =(e)=>
{
  setCA(e.target.innerHTML.replace('<span class="text">',''))
}

const handleRegistrationChange =(e) =>
{
  setRegistration(e.target.value)
}

const handleRollChange =(e) =>
{
  setRoll(e.target.value)
}

let button

if(CA==='' || doc==='' || value==='' || registration==='' || roll==='')
{
  button = <Button disabled onClick={upload}>Upload</Button>
}
else
{
  button = <Button onClick={upload}>Upload</Button>
}

let message

if(details_check===1)
{
  message=<div><Message
  success
  header='File was Successfully Uploaded'
  content='You have successfully uploaded the file'
/></div>
}
else if(details_check===2){
    message = <div><Message negative>
            <Message.Header>Uploading Denyed</Message.Header>
            <p>Check the credentials again</p>
          </Message>
          </div>
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
          <Form.Input fluid label='Registration No.' placeholder='Registration Number' value ={registration} onChange={handleRegistrationChange}/>
          <Form.Input fluid label='Roll No.' placeholder='Roll Number' value ={roll} onChange={handleRollChange}/>
          
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
