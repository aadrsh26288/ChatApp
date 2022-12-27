import React from 'react'
import chatlogo from '../img/messenger.png'
import {BiChat} from 'react-icons/bi'
const Header = ({user,logOut}) => {
  return (
    <div className='bg-[#2C2A32] text-white p-3 flex justify-between items-center'>
        {/* <img src={chatlogo} className='w-10 h-10 text-[#EEF0F1]' />
         */}
         <div>
          <BiChat className='text-3xl'/>
         </div>
        <div className='flex items-center gap-6'>
           
            <div className='flex gap-2 items-center'>
                <img src={user?.photoURL} alt='user' className='h-10 w-10 rounded-full'/>
                <p>{user?.displayName}</p>
            </div>
             <button className='p-2 px-3' onClick={logOut}>Logout</button>


        </div>
    </div>
  )
}

export default Header