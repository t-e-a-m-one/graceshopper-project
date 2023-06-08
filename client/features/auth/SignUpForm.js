import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

const SignUpForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const address = formData.get("address");
    console.log(formData);
    dispatch(authenticate({ username, password, email, firstName, lastName, address, method: 'signup' }));
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
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="address">
            <small>Address</small>
          </label>
          <input name="address" type="text" />
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
