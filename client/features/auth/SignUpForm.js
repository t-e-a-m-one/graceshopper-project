import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

const SignUpForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = evt.target.email.value;
    const name = evt.target.name.value;
    dispatch(authenticate({ username, password, email, name, method: 'signup' }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="email" />
        </div>
        <div>
          <label htmlFor="name">
            <small>Name</small>
          </label>
          <input name="name" type="text" />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default SignUpForm;
