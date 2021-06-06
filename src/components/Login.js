import React , {useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'

import {useAuth} from '../AuthContext'

export default function Login(props) {

    const emailref = useRef()
    const passwordref = useRef()

    const {login} = useAuth()

    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleSubmit(e)
    {
        e.preventDefault()


        try{

        setError('')
        setLoading(true)
        await login(emailref.current.value, passwordref.current.value)

        props.parentCallback('base-login')

        }catch(e){
            console.log(e);
            setError('Failed to login to an account')
        }
        setLoading(false)
    }

    function setSignup()
    {
        props.parentCallback('signup')
    }


    return (
        <div>
            <Card>
                <Card.Body>
                    <h3 className='text-center mb-4'>Sign In</h3>

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

                        
                        <Button disabled={loading} className='w-100' type="Submit">Log In</Button>

                    </Form>

                </Card.Body>
                <div 
                className="w-100 text-center mt-2"
                onClick={setSignup}
                >

                    Dont have an account? Sign Up
                </div>
            </Card>
        </div>
    )
}
