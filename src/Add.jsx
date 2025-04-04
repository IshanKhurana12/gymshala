import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [name, setname] = useState("");
    const [number, setnumber] = useState();
    const [address, setaddress] = useState("");
    const [membership, setmembership] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/login'); // Redirect to login if no session
            }
        };
        checkAuth();
    }, [navigate]);

    const addUser = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from("users")
            .insert([{ name: name, membership: membership, address: address, number: number }]);

        if (error) {
            console.error("Error inserting user:", error);
        } else {
            console.log("User added:", data);
            window.location.href = "/";
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black px-4">
            <form
                className="flex flex-col bg-white shadow-md rounded-lg p-6 w-full max-w-sm mt-0"
                onSubmit={addUser}
            >
                <h2 className="text-xl font-bold text-yellow-500 mb-4 text-center">
                    Add User
                </h2>

                <label htmlFor="name" className="text-black font-medium mb-1">
                    Name
                </label>
                <input
                    className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    id="name"
                />

                <label htmlFor="mobile" className="text-black font-medium mb-1">
                    Mobile Number
                </label>
                <input
                    className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    type="tel"
                    value={number}
                    onChange={(e) => setnumber(e.target.value)}
                    id="mobile"
                />

                <label htmlFor="address" className="text-black font-medium mb-1">
                    Address
                </label>
                <input
                    className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    type="text"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    id="address"
                />

                <label htmlFor="membership" className="text-black font-medium mb-1">
                    Membership Limit
                </label>
                <input
                    className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    type="tel"
                    value={membership}
                    onChange={(e) => setmembership(e.target.value)}
                    id="membership"
                />

                <button
                    className="bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Add;
