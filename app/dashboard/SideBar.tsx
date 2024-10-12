import Link from 'next/link'
import React from 'react'
import { supabase } from '../lib/superbass';

function SideBar({ show = false }) {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/auth';
    };

    const menuStyleClassNames = 'p-2 px-3 mb-2 rounded-sm hover:bg-slate-400 bg-opacity-10 cursor-pointer transition-all mx-auto sm:mx-0';

    return (
        <div className={'bg-blue-950 text-white flex flex-col align-middle pt-4 px-3 lg:min-w-56 fixed w-full h-screen z-10 sm:relative sm:w-min' + ` ${show ? '' : 'hidden'}`}>
            <div className='text-xl mx-auto mb-4'>SideBar</div>
            <div className={menuStyleClassNames}>
                <Link href={'/auth'}>
                    Dashboard
                </Link>
            </div>
            <div className={menuStyleClassNames}>
                <Link href={'/auth'}>
                    Login/SignUp
                </Link>
            </div>
            <div className={menuStyleClassNames + ' bg-red-500 bg-opacity-100 text-center mt-auto'} onClick={handleSignOut}>Log Out</div>
        </div>
    )
}

export default SideBar