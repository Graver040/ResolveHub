import React from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Iridescence from "../../ReactBits/Iridescence";
import { useState } from "react";
import api from "../../services/api";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('citizen');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/register', { name, email, password, role });
            localStorage.setItem('userInfo', JSON.stringify(res.data));
            
            // Redirect based on role
            if (res.data.role === 'admin' || res.data.role === 'officer') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <Iridescence
                color={[0.4, 0.0, 0.9]}
                mouseReact
                amplitude={0.1}
                speed={1}
            />

            <div className="register-card" style={{ position: 'relative', zIndex: 1 }}>

                <h2>Create an Account</h2>
                <p className="register-subtext">
                    Sign up to get started
                </p>

                <form className="register-form" onSubmit={handleRegister}>
                    {error && <p style={{color: 'red', fontSize: '14px', marginBottom: '10px'}}>{error}</p>}

                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" placeholder="Enter your full name" value={name} onChange={e=>setName(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" value={email} onChange={e=>setEmail(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="Create a password" value={password} onChange={e=>setPassword(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label>Register As</label>
                        <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 border border-gray-600 rounded bg-black/40 text-white focus:outline-none focus:border-blue-500">
                            <option value="citizen">Citizen</option>
                            <option value="officer">Officer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button className="register-btn" type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                </form>

                <p className="register-footer">
                    Already have an account? <span onClick={() => navigate('/login')}>Login</span>
                </p>

                <p className="register-footer" style={{ marginTop: '10px' }}>
                    <span onClick={() => navigate('/')}>&larr; Back to Home</span>
                </p>

            </div>

        </div>
    );
};

export default Register;
