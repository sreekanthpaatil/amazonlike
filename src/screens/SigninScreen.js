import React, { useEffect, useState } from 'react';
//import data from '../data';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';


function SigninScreen(props) {
   // console.log(props.match.params.id);
   // const User = data.Users.find(x => x._id === props.match.params.id);
   
   
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const userSignin = useSelector(state=>state.userSignin);
   const { loading, userInfo, error } = userSignin;
   
   const dispatch = useDispatch();

   useEffect(() => {
       if(userInfo){
           props.history.push("/");
       }
       return () => {

       };
   }, [userInfo]);

   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(signin(email,password));
   }


    return <div className="form">
        <form onSubmit={submitHandler}>
           <ul className="form-container">
              
              
              <li>
                  <h2>Sign-In</h2>
              </li>
              <li>
                  {loading && <div>Loading...</div>}
                  {error && <div>{error}</div>}
              </li>
              
              <li>
                  <label htmlfor="email">
                      Email
                  </label>
                  <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                  </input>
              </li>
              <li>
                  <label htmlfor="password">Password</label>
                  <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>

                  </input>
              </li>
              <li>
                  <button type="submit" className="button primary">Signin</button>
              </li>
              <li>
                  New to Amazona?
              </li>
              <li>
                  <Link to="/register" className="button secondary text-center">Craete Your Amazona Account</Link>
              </li>
           </ul>
        </form>

    </div>
}

export default SigninScreen;