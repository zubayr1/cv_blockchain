import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'

import profAPI from './api'

class Profile extends Component {
  
    constructor(props)
    {
      
        super(props)

        this.state =
        {
            profileInfo: [],
            username: '',
            email:this.props.dataParentToChild.email,
            about:'',
            registration:0,
            roll:0,
            isCheckbox: 0,
            savedProfile:false
             
        }

     
      
        
    }

    componentDidMount()
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

                   if(json.some(item => item.email === this.state.email)===true)
                   {
                    //  console.log('true');

                       this.setState({savedProfile:true})
                   }

                  

               }
                   
           )
           .catch(err => reject(err))
       })
       // return false
       
    }


  handleChange = (e, { value }) => this.setState({ value })

  handleNameChange = (event) =>
    {
        this.setState({
            username: event.target.value
        })
    }

    handleRegistrationChange = (event) =>
    {
        this.setState({
            registration: event.target.value
        })
    }
 
    handleRollChange = (event) =>
    {
        this.setState({
            roll: event.target.value
        })
    }

    handleAboutChange = (event) =>
    {
        this.setState({
          about: event.target.value
        })
    }
    
    onSubmit = event  =>
    {
        //Azure Database

        const id = Math.floor(Math.random() * 1000000)
        profAPI.create(`{"id": "${id}", "name":"${this.state.username}", "email":"${this.state.email}", "registration":"${this.state.registration}", "roll":"${this.state.roll}", "about":"${this.state.about}", "usertype":"${this.state.value}"}`)
        .then(prof =>{
          
          this.setState({username: '', email:'', registration:0, roll:0, about:'', value: undefined})

          window.location.reload();
        })




    }

    checkboxClick= event => 
    {
        this.setState({isCheckbox : (this.state.isCheckbox+1)%2})

        
    }
    


  render() {
    const { value } = this.state

    let checkboxdiv

    if(this.state.isCheckbox===1 && this.state.username!=='' && this.state.email!=='' && this.state.value!==undefined)
        checkboxdiv = <Form.Button onClick={this.onSubmit}>Submit</Form.Button>
    else
        checkboxdiv = <Form.Button disabled onClick={this.onSubmit}>Submit</Form.Button>


    let studentinfo

    if(this.state.value==='st')
    {
      studentinfo = <div>
         <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Registration No.' placeholder='Registration Number' value ={this.state.registration} onChange={this.handleRegistrationChange}/>
          <Form.Input fluid label='Roll No.' placeholder='Roll Number' value ={this.state.roll} onChange={this.handleRollChange}/>
          
        </Form.Group>
        
       
      </Form>
      </div>
    }
    else
    {
      studentinfo=<div></div>
    }

    if(this.state.savedProfile===false)
    {
    return (
      <div>
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Name' placeholder='User Name' value ={this.state.username} onChange={this.handleNameChange}/>
          <Form.Input fluid label='Mail ID' placeholder='Email ID' value ={this.state.email} disabled/>
          
        </Form.Group>
        <Form.Group inline>
          <label>User Type</label>
          <Form.Radio
            label='Student'
            value='st'
            checked={value === 'st'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='CA'
            value='ca'
            checked={value === 'ca'}
            onChange={this.handleChange}
          />
          <Form.Radio
            label='University'
            value='un'
            checked={value === 'un'}
            onChange={this.handleChange}
          />
        </Form.Group>
        {studentinfo}
        <Form.TextArea label='About' placeholder='Tell us more about you... (not compulsory)' value ={this.state.about} onChange={this.handleAboutChange}/>
        <Form.Checkbox label='I agree to the Terms and Conditions' onChange={this.checkboxClick}/>
        {checkboxdiv}
      </Form>

      

      </div>
    )
    }
    else
    {
      return(
        <div>
          <Segment>
            <h3>Your Profile is Already Saved</h3>
          </Segment>
        </div>
      )
    }
  }
}

export default Profile