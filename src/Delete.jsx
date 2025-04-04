import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const Delete = () => {
    const [number, setNumber] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    const fetchUserByNumber = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('users').select('*').eq('number', number).single();
        if (error) {
            console.error('Error fetching user:', error);
            setUser(null);
        } else {
            setUser(data);
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete && user) {
            const { error } = await supabase.from('users').delete().eq('id', user.id);
            if (error) {
                console.error('Error deleting user:', error);
            } else {
                setUser(null);
                setNumber('');
                alert('User deleted successfully.');
            }
        }
    };

    return (
        <div className="bg-black text-white p-5">
            <h1 className="text-yellow-500 text-2xl font-bold mb-5">Find and Delete User</h1>
            <div className="mb-5">
                <input
                    type="text"
                    placeholder="Enter user number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="p-2 mr-2 rounded border border-yellow-500"
                />
                <button
                    onClick={fetchUserByNumber}
                    className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
                >
                    Fetch User
                </button>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : user ? (
                <div>
                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Number:</strong> {user.number}
                    </p>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Delete User
                    </button>
                </div>
            ) : (
                <p>No user found.</p>
            )}
        </div>
    );
};

export default Delete;
