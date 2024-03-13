import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const Signin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Check if emailOrPhone is an email or phone number
      let signInMethod = 'password';
      if (emailOrPhone.includes('@')) {
        signInMethod = 'email';
      }

      // Sign in with email/password or phone number/password
      const credentials = signInMethod === 'password' ?
        await firebase.auth().signInWithEmailAndPassword(emailOrPhone, password) :
        await firebase.auth().signInWithPhoneNumber(emailOrPhone, password);

      // User successfully logged in
      console.log('User logged in:', credentials.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="Email or Phone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signin;