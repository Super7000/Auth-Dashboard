'use client'

import { useState } from 'react';
import { supabase } from '../lib/superbass';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

    // Common handler for both login and signup
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response;

        if (isLogin) {
            // Login
            response = await supabase.auth.signInWithPassword({ email, password });
        } else {
            // Signup
            response = await supabase.auth.signUp({ email, password });
        }

        const { data: user, error } = response;
        
        if (error) {
            setMessage(error.message);
        } else if (user) {
            setMessage(isLogin ? 'Login successful!' : 'Signup successful! Check your email.');
            if (!isLogin) {
                window.location.href = '/auth';
            } else {
                // Redirect to dashboard
                window.location.href = '/dashboard';
            }
        } else {
            setMessage('Something went wrong!');
        }
    };

    return (
        <div className='flex items-center justify-center my-auto'>
            <div className='flex flex-col justify-center justify-self-center'>
                <div className='text-2xl mx-auto my-2'>{isLogin ? 'Login' : 'Sign Up'}</div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <input
                        type="email"
                        value={email}
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className='rounded-md p-2 px-4'
                    />
                    <input
                        type="password"
                        value={password}
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className='rounded-md p-2 px-4'
                    />
                    <button className='bg-blue-400 p-3 rounded-md text-white text-base' type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
                {message && <p className='text-orange-600'>{message}</p>}
                <button onClick={() => setIsLogin(!isLogin)} className='mt-2'>
                    {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
}
