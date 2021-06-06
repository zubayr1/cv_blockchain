import React, { Component } from "react";

import './App.css';
import './Styling.css'
import WhyPaul from './components/WhyPaul'
import SecurityInfo from './components/SecurityInfo'
import About from './components/About'
import GetStarted from './components/GetStarted'
import Team from './components/Team'
import Whitepaper from './components/Whitepaper'

import Footer from './components/Footer'
import {  Menu, Image, Button, Grid } from 'semantic-ui-react'
import logo from './images/logo.png'
import SearchEng from './components/SearchEng'

import SignUp from './components/SignUp'
import Login from './components/Login'

import {Container} from 'react-bootstrap'
import { AuthProvider } from "./AuthContext";
import Home from "./components/Home";



// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component{



  constructor (props)
{
  super(props);



  this.state={
    error: null,
    isloggedin: 0,
    profilenum:0,
    signup:0,
    login:0
  };

  this.signup = this.signup.bind(this)

  this.login = this.login.bind(this)

  this.profile = this.profile.bind(this)

  
}



signup()
{
  this.setState({signup: (this.state.signup+1)%2})
  this.setState({login: 0})
}

login()
{
  
  this.setState({login: (this.state.login+1)%2})
  this.setState({signup: 0})
}

 
profile()
{
  
  this.setState({profilenum: (this.state.profilenum + 1)%2 })
  
}

handleCallback = (childData) =>{
  if(childData==='base')
  {
    this.setState({login: 0})
    this.setState({signup: 0})
  }
  else if(childData==='login')
  {
    this.setState({login: 1})
    this.setState({signup: 0})
  }
  else if(childData==='signup')
  {
    this.setState({login: 0})
    this.setState({signup: 1})
  }
  else if(childData==='base-login')
  {

    localStorage.setItem('loggedIn', 'true');

    this.setState({login: 0})
    this.setState({signup: 0})
    this.setState({isloggedin: 1})
  }
  else if(childData==='out')
  {
    localStorage.setItem('loggedIn', 'false');
    this.setState({login: 0})
    this.setState({signup: 0})
    this.setState({isloggedin: 0})
  }

}


render(){

  

  let common_window =
  <div className='mg'>
     <Menu  secondary>
           
           <Image src={logo}  circular size='mini'/>
           <Menu.Menu position='right'>
            
            <SearchEng/>
            <Menu.Item
             name=''
           />
             <Button size='medium' basic color='blue' onClick={()=> this.login()}>Login</Button>
             
             <Menu.Item
             name=''
           />
             <Button size='medium' basic color='blue' onClick={()=> this.signup()}>SignUp</Button>
            
            
           </Menu.Menu>
 
           
           
         </Menu>
         </div>

  let window


  if(this.state.signup===0 && this.state.login===0 )
  {
    window = 
    <div >

      {common_window}
 
 
     <div className='mg'>
 
     
         <br />
       <div >
       <WhyPaul />
       </div>
       <br/>
 
       <SecurityInfo/>
 
       <br />
 
       <GetStarted />
 
       <div className='mg'> 
       <About />
       </div>
 
       <div >
         <Team/>
       </div>
 
       <div >
         <Whitepaper/>
       </div>
 
         
         </div>
         <Footer/>
 
     </div>
  }
  else if(this.state.login!==0 )
  {
    window = <div>
      {common_window}
      <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center"
      style={{minHeight: "100vh"}}
      >
        <div className="w-100" style={{maxWidth: "400px"}}>
            <Login parentCallback = {this.handleCallback}/>
         </div>
      </Container>
    </AuthProvider>
      </div>
  }
  else if(this.state.signup!==0 )
  {
    window = <div>
    {common_window}
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center"
      style={{minHeight: "100vh"}}
      >
        <div className="w-100" style={{maxWidth: "600px"}}>
            <SignUp parentCallback = {this.handleCallback}/>
         </div>
      </Container>
    </AuthProvider>
    </div>
  }


  let loggedinwindow =

  <div>
    
    <AuthProvider>
     
            <Home parentCallback = {this.handleCallback}/>
        
    </AuthProvider>
  
  </div>
 
      let final_window

      if(this.state.isloggedin!==0 || localStorage.getItem('loggedIn')==='true')
      {
        final_window = loggedinwindow
      }
      else
      {
        final_window=window
      }
 

 


  return (
    <div className='mg'>
      {final_window}


      <Grid centered columns={2}>
    <Grid.Column>
      {/* {profile} */}
    </Grid.Column>

    
    
  </Grid>

    </div>
  );
}

}

export default App;
