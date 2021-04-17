
const Login = () => {
    return (
        <div className="container">
            <div className="card my-5 text-center">
                <div className="card-header">
                    Your data is safe with Recipe Book, or maybe not.
                </div>
                <div className="card-body">
                    <form>
                    <div className="form-group">
                        <label className="my-1">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="email@email.com..."/>
                    </div>
                    <div className="form-group my-2">
                        <label className="my-1">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="A secure password..."/>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Login!</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;