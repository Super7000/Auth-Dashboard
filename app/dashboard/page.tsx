'use client'

import { useEffect, useState } from 'react';
import { supabase } from '../lib/superbass';
import { User } from '@supabase/supabase-js'; // Import User type from supabase-js
import { LineChart, BarChart, PieChart } from './charts';
import SideBar from './SideBar';

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [showSideBar, setShowSideBar] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then((session) => {
            setUser(session.data.session?.user || null);

            if (!session.data.session) {
                window.location.href = '/auth'; // Redirect to login if not logged in
            }
        });
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <>
            <button className="fixed top-2 right-6 z-20 space-y-2 bg-white hover:bg-gray-100 p-2 rounded max-h-min shadow-lg" onClick={() => setShowSideBar(val => !val)}>
                <span className="block w-7 h-0.5 bg-gray-600"></span>
                <span className="block w-7 h-0.5 bg-gray-600"></span>
                <span className="block w-7 h-0.5 bg-gray-600"></span>
            </button>
            <div className='flex'>
                <SideBar show={showSideBar} />
                <div className='flex flex-col flex-grow h-screen overflow-auto'>
                    <div className='font-semibold justify-center mx-auto mt-3 text-2xl'>Welcome, {user.email?.split('@')[0]}</div>
                    <div className="p-4 flex-grow">
                        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded shadow grid justify-items-center">
                                <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
                                <LineChart />
                            </div>
                            <div className="bg-white p-4 rounded shadow grid justify-items-center">
                                <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
                                <BarChart />
                            </div>
                            <div className="bg-white p-4 rounded shadow grid justify-items-center">
                                <h2 className="text-lg font-semibold mb-2">Pie Chart (Realtime)</h2>
                                <PieChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
