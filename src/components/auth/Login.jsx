import React, { useState } from 'react';
import LinkButton from '../../components/ui/button/LinkButton.jsx';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

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
    <>
      <h1>Welcome to North Shore</h1>
      <form onSubmit={handleLogin}>
        <div
          style={{
            marginTop: '1em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
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

          <button className="button" disabled={loading}>
            {loading ? <span>Please Wait</span> : <span>Log In</span>}
          </button>
        </div>
      </form>

      <p>Don&apos;t have an account? </p>
      <LinkButton to={'/signup'}>Sign Up</LinkButton>
      <LinkButton to={'/'}>Nevermind</LinkButton>
    </>
  );
}
