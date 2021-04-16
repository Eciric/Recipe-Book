import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand mx-4" to="/">Recipe Book</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto me-4">
                        <li className="nav-item me-2">
                            <Link className="nav-link" to='/'>Home</Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link className="nav-link" to='/login'>Login</Link>
                        </li>
                        <li className="nav-item me-2">
                            <Link className="nav-link" to='/register'>Sign up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;