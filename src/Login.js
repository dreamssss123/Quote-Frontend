// import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

export default function SignInSide() {
  
  const navigate = useNavigate();
//   const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
        username: data.get('user'),
        password: data.get('password')
    };
    // console.log(jsonData);

    fetch('http://localhost:5176/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(res => res.json())
    .then(data => {
        // console.log('Success:', data);
        if( data.status=='ok' && data.access_token && data.access_token!='' ){
            // alert('login success');
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('username', data.username);
            navigate('/');
        }else{
            alert('Login Failed');
        }
    })
    .catch((error) => {
        console.error('Error: ', error);
        // console.log(error);
        alert('Error');
    });
  }

  const h1z = {textAlign: 'center', padding: '10px'};
  const login_box = {textAlign: 'center'};

  return (
    <div>
        <Header />

        <div style={login_box}>
            <h1 className='text-center mt-7 text-3xl font-bold underline mb-5'>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='user' placeholder="Username" className="border-2 border-black pt-1 pb-1 pl-3 pr-3" />
                <br /><br />
                <input type='password' name='password' placeholder="Password" className="border-2 border-black pt-1 pb-1 pl-3 pr-3" />
                <br /><br />
                <button typee="button" className="border-2 border-black pt-1 pb-1 pl-5 pr-5">Login</button>
            </form>
        </div>
    </div>
  );
}