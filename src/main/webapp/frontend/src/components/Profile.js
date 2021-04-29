import defaultImage from '../images/user.png';
import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import logo from '../images/book.png';
import authHeader from '../services/authHeader';

const API_URL = 'http://localhost:8080/api/files/testUpload';

const Profile = () => {
    const [profileUri, setProfileUri] = useState(defaultImage);
    const {username} = useParams();
    const inputFile = useRef(null);
    const onButtonClick = () => {
       inputFile.current.click();
    };

    useEffect(() => {
        // Fetch user data by username
        console.log(username);
    }, [username]);

    const onFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            fetch(API_URL, {
                method: 'post',
                body: formData,
                headers: authHeader()
            }).then(res => {
                if (res.ok) {
                    const reader = new FileReader();
                    reader.addEventListener("load", function () {
                        setProfileUri(reader.result);
                      }, false);
                    
                      if (file) {
                        reader.readAsDataURL(file);
                      }
                }
            });
        }
    };

    return (
        <div id="profileContainer" className="container my-5">
            <div className="profilePictureContainer">
                <img id="profilePicture" src={profileUri} alt="" className="img-fluid my-4"/>
                <div className="addProfilePictureContainer">
                    <span className="fa-stack">
                        <i id="backgroundIcon" className="fa fa-circle fa-stack-1x"></i>
                        <i id="addProfilePictureIcon" className="fa fa-plus-circle fa-stack-1x" onClick={onButtonClick}>
                            <input type='file' id='file' ref={inputFile} onChange={onFileChange} style={{display: 'none'}}/>
                        </i>
                    </span>
                </div>          
            </div>
            <h1 className="display-4">{username}</h1>
            <p>
                Recipes shared: {0}
                <br></br>
                All recipe likes: {0}
            </p>
            

            <hr className="my-5"></hr>
            <div className="container ">
                <h1 className="display-4 text-center my-5">My recipes</h1>
                <div className="row justify-content-center mx-5 text-center padding">
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-2">
                        <img className='img-fluid' src={logo} alt=""/>
                        <h4>Strawberry Pancakes</h4>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-2">
                        <img className='img-fluid' src={logo} alt=""/>
                        <h4>Brownies</h4>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-2">
                        <img className='img-fluid' src={logo} alt=""/>
                        <h4>Poppyseed Cake</h4>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-2">
                        <img className='img-fluid' src={logo} alt=""/>
                        <h4>Strawberry Pancakes</h4>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-2">
                        <img className='img-fluid' src={logo} alt=""/>
                        <h4>Brownies</h4>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-2">
                        <img className='img-fluid' src={logo} alt=""/>
                        <h4>Poppyseed Cake</h4>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-2">
                        <img className='img-fluid' src={logo} alt=""/>
                        <h4>Strawberry Pancakes</h4>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-2">
                        <img className='img-fluid' src={logo} alt=""/>
                        <h4>Brownies</h4>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4 my-2">
                        <img className='img-fluid' src={logo} alt=""/>
                        <h4>Poppyseed Cake</h4>
                    </div>
                </div>
            </div>

            <br></br>
        </div>
    );
}

export default Profile;