import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/firebase_auth';

const Register = () => {

      const [registerError, setRegisterError] = useState('')
      const [success, setSuccess] = useState('')
      const [showPassword, setShowPassword] = useState(false)




      const handleRegister = (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            console.log("email : ", email, "password : ", password);
            if (password.length < 6) {
                  setRegisterError('you must have at least 6 characters');
                  return;
            } else if (!/[A-Z]/.test(password)) {
                  setRegisterError('password must be uppercase one letter');
                  return;
            }
            // reset error
            setRegisterError('')
            setSuccess('')
            //create a new user account
            createUserWithEmailAndPassword(auth, email, password)
                  .then(result => {
                        console.log(result.user);
                        setSuccess('user created successfully')
                  })
                  .catch(err => {
                        console.error(err.message);
                        setRegisterError(err.message);
                  })
      }





      return (
            <div className=''>
                  <div className='mx-auto md:w-1/2'>
                        <h3 className="text-3xl py-4">Please Register here</h3>
                        <form onSubmit={handleRegister}>
                              <input className='mb-4 w-3/4 p-3 border' type="email" name='email' id='' placeholder='Email Address'/>
                              <br />
                              <input className='mb-4 w-3/4 p-3 border'
                                    type={showPassword ? 'text': "password"}
                                    name='password'
                                    id=''
                                    placeholder='Password' />
                              <button onClick={()=> setShowPassword(!showPassword)}>Show</button>
                              <br />
                              <input className='btn btn-secondary mb-4 w-3/4' type="submit" value="Register" />
                        </form>
                        {(registerError && <p className="text-red-700">{registerError}</p>) || (success && <p className="text-green-800">{success}</p>)}
                  </div>
            </div>
      );
};

export default Register;