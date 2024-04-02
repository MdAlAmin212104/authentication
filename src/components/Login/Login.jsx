import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase/firebase_auth';
import { Link } from 'react-router-dom';

const Login = () => {
      

      const [loginError, setLoginError] = useState('')
      const [success, setSuccess] = useState('')
      const emailRef = useRef(null)

      const handleSubmitLogin = (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            console.log(email, password);
            setSuccess('')
            setLoginError('')

            // login success method
            
            signInWithEmailAndPassword(auth, email, password)
                  .then(result => {
                        console.log(result.user);
                        setSuccess("user login successful")
                  })
                  .catch(err => {
                        console.error(err);
                        setLoginError(err.message);
                  })

      }


      const handleForgetPassword = () => {
            const email = emailRef.current.value;
            if (!email) {
                  console.log("please provide an email", emailRef.current.value);
                  return;
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                  console.log("please provide an valid email");
                  return;
            }
            

            // send validation email
            sendPasswordResetEmail(auth, email)
                  .then(() => {
                        console.log("please check your email", emailRef.current.value);
                  })
                  .catch(error => {
                        console.log(error);
                  })
      }


      return (
            <div className='bg-gray-50 pt-8'>
                  <h2 className="text-3xl text-center mb-4">Please Log in</h2>
                  <div className="flex items-center justify-center text-center ">
                        <form onSubmit={handleSubmitLogin} className="flex flex-col w-full max-w-lg p-12 rounded shadow-lg bg-gray-900 text-white">
                              <label htmlFor="username" className="self-start text-xs font-semibold">Username or Email</label>
                              <input
                                    id="email"
                                    type="email"
                                    name='email'
                                    ref={emailRef}
                                    className="flex items-center h-12 px-4 mt-2 rounded text-black"
                              />
                              <label htmlFor="password" className="self-start mt-3 text-xs font-semibold">Password</label>
                              <input
                                    id="password"
                                    type="password"
                                    name='password'
                                    className="flex items-center h-12 px-4 mt-2 rounded text-black"
                              />

                              <button type="submit" className="flex items-center justify-center h-12 px-6 mt-8 text-sm font-semibold rounded bg-violet-600 text-gray-50">Login</button>
                              <div className="flex justify-center my-6 space-x-2 text-xs">
                                    <a
                                          href='#'
                                          onClick={handleForgetPassword} 

                                          className="dark:text-gray-600"
                                    >
                                          Forgot Password?</a>
                                    
                                    <span className="dark:text-gray-600">/</span>

                                    <Link
                                          to='/register'
                                          className="dark:text-gray-600"
                                    >
                                          Sign Up</Link>
                              </div>
                              {(success && <p className='text-green-800 '>{success}</p>) || (loginError && <p className='text-red-800'>{loginError}</p>)}
                        </form>
                  </div>
                  
            </div>
      );
};

export default Login;