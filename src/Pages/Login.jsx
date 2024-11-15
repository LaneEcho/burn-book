import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

// TODO:
// make not ugly
// handle errors
// could do phone OR email

export default function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.target);

    const formValues = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const { error } = await supabase.auth.signInWithPassword({
      email: formValues.email,
      password: formValues.password,
    });

    if (error) {
      // throw error later
      console.log('error- ', error);
      setLoading(false);
    } else {
      console.log('logged in');
      return navigate('/');
    }
  };

  return (
    <div>
      <h1>Welcome to North Shore</h1>
      <form onSubmit={handleLogin}>
        <div>
          <input
            name="email"
            className="inputField"
            type="email"
            placeholder="email"
            required={true}
          />
          <input
            name="password"
            className="inputField"
            type="password"
            placeholder="Password"
            required={true}
          />
        </div>
        <div>
          <button className="icon-button" disabled={loading}>
            {loading ? <span>Please Wait</span> : <span>Log In</span>}
          </button>
        </div>
      </form>

      <p>Don't have an account? </p>
      <Link to={'/signup'}>Sign Up</Link>
      <Link to={'/'}>
        <button className="icon-button" disabled={loading}>
          Nevermind
        </button>
      </Link>
    </div>
  );
}
