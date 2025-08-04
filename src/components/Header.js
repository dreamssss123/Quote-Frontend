import React from 'react'

function Header() {

    const logoutHandle = (event) => {
        event.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location = '/login';
    }
    console.log(localStorage.getItem('username'));

  return (
    <div className='bg-black'>
        <div className='container mx-auto grid grid-cols-6 text-white py-5'>

            {localStorage.getItem('username')!=null && localStorage.getItem('username')!='' ? (
                <>
                    <div className='col-span-3 text-4xl'>Quote System</div>
                    <div className='pt-2 col-span-3 text-right'>
                        <span>User: </span>  <span className='font-bold'>{localStorage.getItem('username')} &nbsp; | &nbsp; </span>
                        <a onClick={logoutHandle} className='cursor-pointer'>Logout</a>
                    </div>
                </>
            ) : (
                <>
                    <div className='col-span-6 text-4xl text-center'>Quote System</div>
                </>
            )}


        </div>
    </div>
  )
}

export default Header