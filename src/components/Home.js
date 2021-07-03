import React, { useState, useEffect} from 'react'
import {  Menu, Image, Button, Icon, Grid, Segment } from 'semantic-ui-react'
import logo from '../images/logo.png'
import SearchEng from './SearchEng'
import {useAuth} from '../AuthContext'

import Profile from './profile'
import Upload from './Upload'
import Notification_CA from './Notification_CA'
import NotificationSt from './NotificationSt'
import Blockchain from './Blockchain'


export default function Home(props) {
    const {logout, currentUser} = useAuth()

    localStorage.setItem('currentuser', currentUser);


    const [profile, setProfile] = useState(0)

    const [isprofilesetinDB, setIsProfileSetInDB] = useState(0)

    const [registration, setregistration] = useState(0)

    const [roll, setroll] = useState(0)

    const [type, settype] = useState(0)

    
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
                     if(list[count].includes('st') && list[count].includes(currentUser.email))
                     {

                       var string = list[count].replace(']','').replace('[','')

                      //  console.log(string);
                      if(!string.endsWith('}'))
                      {
                        string = string+'}'
                      }
                       var final_json = JSON.parse(string)



                       setregistration(final_json.registration)
                       setroll(final_json.roll)

                       settype(final_json.usertype)


                      }

                      

                   }
                   

               }
                   
           )
           .catch(err => reject(err))
       })

            //check if exists...
            new Promise((resolve, reject)=>
            {
                
                fetch(`api/doc`)
                .then(result => result.json()
                )
                .then(json => 
                    {
                        resolve(json)
     
                        if(json.some(item => item.email === currentUser.email)===true)
                        {
                         //  console.log('true');
     
                         setIsProfileSetInDB(1)
                        }
     
                       
     
                    }
                        
                )
                .catch(err => reject(err))
            }, [])
     
        }, [])
       
    

    async function handle_logout(e)
    {
        try{
            e.preventDefault()
            logout()
            
            props.parentCallback('out')

        
        
          }catch(e)
          {
            console.log(e);
          }
    }

    function handle_profile()
    {
        setProfile((profile+1)%2)
    }

     let profilediv

  if(profile===1)
  {
    profilediv = <Profile dataParentToChild = {currentUser}/>
  }

  else
  {
    profilediv = <div></div>
  }

  let uploaddiv

  let notificationdiv

  if(type==='st'){
    notificationdiv = <NotificationSt dataParentToChild = {currentUser.email }/>
    
  if(isprofilesetinDB===0)
  {
    uploaddiv=<div>
      <Segment>
        <h2>Upload</h2>
        <h4>Set Profile First</h4>
      </Segment>
    </div>
  }
  else{
    var string = currentUser.email+ " "+ registration+ " "+ roll
    uploaddiv = <Upload dataParentToChild = {string}/>
    
  }
}
else if(type==='ca')
{
  uploaddiv=<div>
      <Segment>
        <h2>Upload for CA</h2>
        <h4>Uploading available from notification</h4>
      </Segment>
    </div>


  
  notificationdiv = <Notification_CA dataParentToChild = {currentUser.email }/>


}

    
    return (
        <div>
            <div className='mg'>
              
     <Menu  secondary>
           
           <Image src={logo}  circular size='mini'/>

           <Menu.Item
             name=''
           />
          <Button icon labelPosition='left' size='medium' basic color='blue' onClick={handle_profile}>
                <Icon name='user' />
                Profile
              </Button>             

           <Menu.Menu position='right'>
            
            <SearchEng/>
            <Menu.Item
             name=''
           />
             <Button size='medium' basic color='blue' onClick={handle_logout}>Logout</Button>
             
             
            
           </Menu.Menu>
 
           
           
         </Menu>
         </div>
        <br/>
    <Grid columns divided>
            <Grid.Row>
                <Grid.Column width={13}>
                    {profilediv}

                </Grid.Column>

                <Grid.Column width={3}>
                    {uploaddiv}
                </Grid.Column>
            
            </Grid.Row>

        </Grid>

        <br/>
        {notificationdiv}
        <br/>
        <Blockchain  dataParentToChild = {currentUser.email }/>
        </div>
    )
}
