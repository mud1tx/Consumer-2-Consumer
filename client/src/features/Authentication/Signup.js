import React from 'react'

const Signup = () => {
  return (
    <form action="/signup" method="post">
      <div>
        <label>Name</label>
        <input type="name" name="name" id="name" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" id="confirmPassword" />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Signup