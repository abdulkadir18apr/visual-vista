import { useState } from 'react';
import { supabase } from '../superbase/superbase';
import "./login.scss"
import { Link, useNavigate } from 'react-router-dom';
import { notify } from '../assets/toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/authReducer';


export const Login = () => {
    const navigate=useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch= useDispatch();

    const handleLogin = async (email,password) => {

        try {
            const { data, error } = await supabase.auth.signInWithPassword({

                email,
                password,
            });

            if (error) {
                notify("email/password mismatch","error");
                setEmail("");
                setPassword("");
                console.error('Login error:', error.message);
            } else {
                notify("login Success","success");
                localStorage.setItem('access-token',JSON.stringify(data.session))
                dispatch(setUser(data.user));
                navigate("/dashboard")
                console.log('User logged in:', data);
            }
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };
    
    return (
        <div className='login'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className='login-container'>
                <h3>Login Here</h3>
                <label htmlFor="username">Email</label>
                <input type="email" placeholder="Email" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={()=>handleLogin(email,password)}>Log In</button>
                <div className="social">
                    <div className="go" onClick={()=>handleLogin("test@gmail.com","123456")}>Test Login</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Google</div>
                </div>
                <div className="link">
                    <Link  to={"/signup"}> New User?? </Link>
                </div>

            </div>
           
        </div>
    );
};

