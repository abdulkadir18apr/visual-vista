import { useState } from 'react';
import { supabase } from '../superbase/superbase';
import { Link } from 'react-router-dom';
import { notify } from '../assets/toast';



export const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        notify("someting went wrong",error);
      } else {
        await supabase.from('profiles').upsert([
            {
              id: data.user.id,
              first_name:firstName,
            },
          ]);
          notify("signUp success","success")
        console.log('User logged in:', data);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      notify("Something went wrong","error")
    }
  };

  return (
    <div className='signup'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className='login-container'>
                <h4>Signup Here</h4>
            
                    <label htmlFor="FirstName">First-Name</label>
                    <input type="text" placeholder="John" id="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label htmlFor="username">Email</label>
                <input type="email" placeholder="Email" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={()=>handleLogin(email,password)}>Sign Up</button>
                <div className="link">
                    <Link  to={"/login"}>Already a user?? login </Link>
                </div>

            </div>
           
        </div>
  );
};

