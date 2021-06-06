import React , {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'

import {useAuth} from '../AuthContext'

export default function SignUp(props) {

    const emailref = useRef()
    const passwordref = useRef()
    const passwordConfirmref = useRef()

    const {signup} = useAuth()

    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleSubmit(e)
    {
        e.preventDefault()

        if(passwordref.current.value!==passwordConfirmref.current.value)
        {
            return setError('Passwords do not Match')
        }

        try{

        setError('')
        setLoading(true)
        await signup(emailref.current.value, passwordref.current.value)

        props.parentCallback('base')

        }catch(e){
            console.log(e);
            setError('Failed to create an account')
        }
        setLoading(false)

        

        
    }

    function setLogin()
    {
        props.parentCallback('login')
    }


    return (
        <div>
            <Card>
                <Card.Body>
                    <h3 className='text-center mb-4'>Sign Up</h3>

                    {/* { currentUser.email} */}

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailref} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordref} required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmref} required />
                        </Form.Group>

                        <Button disabled={loading} className='w-100' type="Submit">Sign Up</Button>

                    </Form>

                </Card.Body>
                <div 
                className="w-100 text-center mt-2"
                onClick={setLogin}
                >

                    Already have an account? Log In
                </div>
            </Card>
        </div>
    )
}
