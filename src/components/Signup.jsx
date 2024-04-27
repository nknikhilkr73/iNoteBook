import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })

    const navigate = useNavigate()

    const host = "https://main--iinotebookk.netlify.app/"


    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()


        if (json.token) {

            //save the auth token and redirect
            localStorage.setItem('token', json.token)
            props.showAlert("Account created Successfully ", "success")

            navigate('/')

        }
        else {
            console.log("error login");
            // props.showAlert("Invalid Credentials ", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-2'>
            <h2> Create an account to use iNotebook</h2>
            <form className='my-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input minLength={5} required type="text" className="form-control" id="name" name='name' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input minLength={5} required type="email" className="form-control" id="email" name='email' autoComplete='off' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input minLength={5} required type="password" className="form-control" id="password" name='password' autoComplete='off' onChange={onChange} />
                </div>
                {/* <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="cpassword" className="form-control" id="cpassword" name='cpassword' autoComplete='off' onChange={onChange} />
                </div> */}

                <button type="submit" className="btn btn-primary" >Signup</button>
            </form>

        </div>
    )
}

export default Signup