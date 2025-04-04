import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const [phone, setPhone] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [membership, setMembership] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login'); // Redirect to /login if not authenticated
            }
        };

        checkAuth();
    }, [navigate]);

    const fetchUserDetails = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('number', phone)
            .single();

        if (error) {
            console.error('Error fetching user details:', error);
            setUserDetails(null);
        } else {
            setUserDetails(data);
            setMembership(data.membership || '');
        }
    };

    const updateMembership = async () => {
        const { error } = await supabase
            .from('users')
            .update({ membership })
            .eq('number', phone);

        if (error) {
            console.error('Error updating membership:', error);
        } else {
            alert('Membership updated successfully!');
            fetchUserDetails(); // Refresh user details
        }
    };

    return (
        <div className="min-h-screen bg-black text-yellow-500 flex flex-col items-center justify-center p-4">
            <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md">
                <label className="block text-sm font-bold mb-2 text-yellow-500">Phone Number:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 mb-4 border border-yellow-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                    onClick={fetchUserDetails}
                    className="w-full bg-yellow-500 text-black py-2 px-4 rounded hover:bg-black hover:text-yellow-500 transition"
                >
                    Fetch User
                </button>
            </div>

            {userDetails && (
                <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md mt-6">
                    <h3 className="text-lg font-bold mb-4 text-yellow-500">User Details:</h3>
                    <p className="mb-2">Name: {userDetails.name}</p>
                    <p className="mb-2">Mobile Number: {userDetails.number}</p>
                    <p className="mb-4">Current Membership: {userDetails.membership} Days</p>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-yellow-500">Update Membership:</label>
                        <input
                            type="text"
                            value={membership}
                            onChange={(e) => setMembership(e.target.value)}
                            className="w-full p-2 mb-4 border border-yellow-500 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        <button
                            onClick={updateMembership}
                            className="w-full bg-yellow-500 text-black py-2 px-4 rounded hover:bg-black hover:text-yellow-500 transition"
                        >
                            Update Membership
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Update;