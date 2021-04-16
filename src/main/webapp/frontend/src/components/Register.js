
const Register = () => {
    return (
        <div className="container">
            <div className="card my-5 text-center">
                <div className="card-header">
                    Register your account today!
                </div>
                <div className="card-body">
                    <form>
                    <div className="form-group">
                        <label className="my-1">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="email@email.com..."/>
                    </div>
     
                    <div className="form-group">
                        <label className="my-1">Username</label>
                        <input type="text" className="form-control" id="inputUsername" placeholder="A nice username..."/>
                    </div>
     
                    <div className="form-group">
                        <label className="my-1">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="A secure password..."/>
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;