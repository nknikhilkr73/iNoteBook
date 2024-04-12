import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    let location = useLocation();

    // useEffect(() => {

    // }, [location]);

    return (
        <div>
            <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><i>iNotebook</i></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>

                        </ul>

                        {!localStorage.getItem('token') ? <form className='d-flex align-items-center '>
                            <Link className='btn btn-primary mx-2 btn-sm' to='/login' role='button'>Login</Link>
                            <Link className='btn btn-primary mx-1 btn-sm' to='/signup' role='button'>SignUp</Link>
                        </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar