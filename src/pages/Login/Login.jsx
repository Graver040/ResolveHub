import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Iridescence from "../../ReactBits/Iridescence";
import { useState } from "react";
import api from "../../services/api";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            if (res.data.role === 'admin' || res.data.role === 'officer') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <Iridescence
                color={[0.4, 0.0, 0.9]}
                mouseReact
                amplitude={0.1}
                speed={1}
            />

            <div className="login-card" style={{ position: 'relative', zIndex: 1 }}>

                <h2>Welcome Back</h2>
                <p className="login-subtext">
                    Login to access your dashboard
                </p>

                <form className="login-form" onSubmit={handleLogin}>

                    {error && <p style={{color: 'red', fontSize: '14px', marginBottom: '10px'}}>{error}</p>}

                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required />
                    </div>

                    <button className="login-btn" type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>

                <p className="login-footer">
                    Don’t have an account? <span onClick={() => navigate('/register')}>Register</span>
                </p>

                <p className="login-footer" style={{ marginTop: '10px' }}>
                    <span onClick={() => navigate('/')}>&larr; Back to Home</span>
                </p>

            </div>

        </div>
    );
};

export default Login;