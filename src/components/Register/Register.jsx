import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/firebase_auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {

      const [registerError, setRegisterError] = useState('')
      const [success, setSuccess] = useState('')
      const [showPassword, setShowPassword] = useState(false)




      const handleRegister = (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            const accept = e.target.terms.checked



            console.log("email : ", email, "password : ", password, accept);
            if (password.length < 6) {
                  setRegisterError('you must have at least 6 characters');
                  return;
            } else if (!/[A-Z]/.test(password)) {
                  setRegisterError('password must be uppercase one letter');
                  return;
            } else if (!accept) {
                  setRegisterError('Please accept out trams and conditions')
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
                              <input className='mb-4 w-full p-3 border' type="email" name='email' id='' placeholder='Email Address'/>
                              <br />
                              <div className='mb-4 relative border'>
                                    <input className='w-full p-3 border'
                                    type={showPassword ? 'text': "password"}
                                    name='password'
                                    id=''
                                    placeholder='Password' />
                                    <span className='absolute top-4 right-2' onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash />  : <FaEye />}</span>
                              </div>
                              <div className=''>
                                    <input type="checkbox" name="terms" id="terms" />
                                    <label htmlFor="terms"> Accept out <a className='underline' href="#">Terms and Conditions</a></label>
                              </div>
                              <br />
                              <input className='btn btn-secondary mb-4 w-full' type="submit" value="Register" />
                        </form>
                        {(registerError && <p className="text-red-700">{registerError}</p>) || (success && <p className="text-green-800">{success}</p>)}
                  </div>
            </div>
      );
};

export default Register;