import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// TODO:
// add validation
// make not ugly
// handle errors

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.target);

    const formValues = {
      username: formData.get('username'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
    };

    const { data, error } = await supabase.auth.signUp({
      email: formValues.email,
      phone: formValues.phone,
      password: formValues.password,
      options: {
        data: {
          username: formValues.username,
        },
      },
    });

    if (error) {
      // throw error later
      console.log('error- ', error);
      setLoading(false);
    } else {
      console.log('user created');
      return navigate('/');
    }
  };

  return (
    <div>
      <div>
        <h1>Welcome to North Shore</h1>
        <p className="description">Create an account</p>
        <form onSubmit={handleSignup}>
          <div>
            <input
              name="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              required={true}
            />
            <input
              name="phone"
              className="inputField"
              type="tel"
              placeholder="Your phone"
              required={true}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
            <input
              name="username"
              className="inputField"
              type="input"
              placeholder="Username"
              required={true}
            />
            <input
              name="password"
              className="inputField"
              type="password"
              placeholder="Your Password"
              required={true}
            />
          </div>
          <div>
            <button className="icon-button" disabled={loading}>
              {loading ? <span>Please Wait</span> : <span>Sign Up</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
