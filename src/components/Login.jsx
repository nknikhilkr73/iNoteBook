import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' })

    const navigate = useNavigate()

    const host = "http://localhost:5000"


    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()


        if (json.token) {

            //save the auth token and redirect
            localStorage.setItem('token', json.token)
            props.showAlert("Logged in  Successfully ", "success")

            navigate('/')


        }
        else {
            props.showAlert("Invalid Credentials", 'danger')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-3'>
            <h2>Login to continue to iNotebook</h2>
            <form className='my-3' onSubmit={handleSubmit} >

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" value={credentials.email} className="form-control" id="email" name='email' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} className="form-control" id="password" name='password' autoComplete='off' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Login</button>
            </form>

        </div>
    )
}

export default Login