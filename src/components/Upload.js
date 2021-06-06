import {useState, useEffect} from 'react';
import storage from '../firebase_storage';
import { Button, Header, Icon, Segment, Form, Dropdown } from 'semantic-ui-react'

function Upload(props) {

const [doc , setDoc] = useState('');

const [value , setValue] = useState('');

const [CA, setCA] = useState('');



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
storage.ref(`/documents/${props.dataParentToChild}/${value}`).put(doc)
.then(function (snapshot) {
  alert('Successfully Uploaded Document')
  window.location.reload()
}
  )

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




let button

if(CA==='' || doc==='' || value==='')
{
  button = <Button disabled onClick={upload}>Upload</Button>
}
else
{
  button = <Button onClick={upload}>Upload</Button>
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
      </Form>
      <Dropdown placeholder='Select CA' clearable options={options} selection onChange={handledropdown}/>
      <br/>
	{button}
  </Segment>
	</div>
);
}

export default Upload;
