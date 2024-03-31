import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import auth from '../../firebase/firebase_auth';

const Register = () => {
      const handleRegister = (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            console.log("email : ", email, "password : ", password);
            //create a new user account
            createUserWithEmailAndPassword(auth, email, password)
                  .then(result => {
                        console.log(result.user);
                  })
                  .catch(err => {
                        console.log(err.massage);
                  })
      }





      return (
            <div className=''>
                  <div className='mx-auto md:w-1/2'>
                        <h3 className="text-3xl py-4">Please Register here</h3>
                        <form onSubmit={handleRegister}>
                              <input className='mb-4 w-3/4 p-3 border' type="email" name='email' id='' placeholder='Email Address'/>
                              <br />
                              <input className='mb-4 w-3/4 p-3 border' type="password" name='password' id='' placeholder='Password'/>
                              <br />
                              <input className='btn btn-secondary mb-4 w-3/4' type="submit" value="Register" />
                        </form>
                  </div>
            </div>
      );
};

export default Register;