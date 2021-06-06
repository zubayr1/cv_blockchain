import React, { useState, useEffect} from 'react'
import {  Menu, Image, Button, Icon, Grid, Segment } from 'semantic-ui-react'
import logo from '../images/logo.png'
import SearchEng from './SearchEng'
import {useAuth} from '../AuthContext'

import Profile from './profile'
import Upload from './Upload'


export default function Home(props) {
    const {logout, currentUser} = useAuth()

    localStorage.setItem('currentuser', currentUser);


    const [profile, setProfile] = useState(0)

    const [isprofilesetinDB, setIsProfileSetInDB] = useState(0)


    
      useEffect(()=>
      {
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
       })
       // return false
      })
       
    

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
    uploaddiv = <Upload dataParentToChild = {currentUser.email}/>
    
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


        </div>
    )
}
