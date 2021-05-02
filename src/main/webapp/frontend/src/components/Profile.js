import defaultImage from '../images/user.png';
import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import logo from '../images/book.png';
import {downloadProfilePicture, uploadProfilePicture} from '../services/fileService';
import Loader from 'react-loader-spinner';

// Black magic and wizardy, but its the only way for this to work.
function base64toBlob(base64Data, contentType) {
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

const Profile = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [profileUri, setProfileUri] = useState(defaultImage);
    const [userRecipes, setUserRecipes] = useState([]);
    const {username} = useParams();
    const inputFile = useRef(null);
    const onButtonClick = () => {
       inputFile.current.click();
    };

    useEffect(() => {
        setLoading(true);
        downloadProfilePicture()
        .then(res => {
            if (res.status === 200) {
                let blob = base64toBlob(res.data.bytes, "image/png");
                const objectURL = URL.createObjectURL(blob)
                setProfileUri(objectURL);
            } else {
                setProfileUri(defaultImage);
            }
            setLoading(false);
        })
        .catch(err => {
            setErrorMessage(err);
            setLoading(false);
        })
    }, []);

    const onFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        if (file) {
            setLoading(true);
            uploadProfilePicture(file)
            .then(res => {
                if (res.ok) {
                    const reader = new FileReader();
                    reader.addEventListener("load", function () {
                        setProfileUri(reader.result);
                        setLoading(false);
                    }, false);
                
                    if (file) {
                        reader.readAsDataURL(file);
                    }
                }
            })
            .catch(err => {
                setErrorMessage(err);
                setLoading(false);
            })
        }
    };

    return (
        <div id="profileContainer" className="container my-5">
            <div className="profilePictureContainer ">
                {loading ? 
                    <Loader type="ThreeDots" color="#683ED1" height="100" width="100" />
                    :
                    (<div>
                        <img id="profilePicture" src={profileUri} alt="" className="img-fluid my-4"/>
                        <div className="addProfilePictureContainer">
                            <span className="fa-stack">
                                <i id="backgroundIcon" className="fa fa-circle fa-stack-1x"></i>
                                <i id="addProfilePictureIcon" className="fa fa-plus-circle fa-stack-1x" onClick={onButtonClick}>
                                    <input type='file' id='file' ref={inputFile} onChange={onFileChange} style={{display: 'none'}}/>
                                </i>
                            </span>
                        </div>          
                    </div>)
               }
                
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
                {userRecipes.length ? 
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
                    :
                    (<div>No recipes? Add some now!</div>)
                }
                
            </div>

            <br></br>
        </div>
    );
}

export default Profile;