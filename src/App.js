import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
// import Button from '@mui/material/Button';
// import { useNavigate, useLocation } from "react-router-dom";


export default function App() {

  // const navigate = useNavigate();
  // // const location = useLocation();
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          fetch('http://localhost:5176/auth/validatejwt', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'bearer '+ token,
              },
          })
          .then(res => res.json())
          .then(data => {
              // console.log('Success:', data);
              if( data.message=='Unauthorized' && data.statusCode==401 ){
                window.location = '/login';
              }
          });

          const resz = await fetch('http://localhost:5176/quote', {
              method: 'GET',
              headers: {
                  // 'Content-Type': 'application/json',
                  'Authorization': 'bearer '+ localStorage.getItem('token'),
              },
          })
          let resz2 = await resz.json();
          // console.log(resz2);
          setQuotes(resz2);


        } catch (err) {
        
        }
    }
    fetchData();

  }, []);

  const filterHandle = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      fetch('http://localhost:5176/quote/new_search/findlike', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'bearer '+ localStorage.getItem('token'),
          },
          body: JSON.stringify({search: data.get('search'), sortz: data.get('sortz')}),
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setQuotes(data);
      });
  }

  // const stylesome = {color:'#7c7c7c'};

  return (
    <div>
      <Header />
      
      <div className='container mx-auto'>

          <h1 className='text-center mt-7 text-3xl font-bold underline'>รายการคำคม</h1>


          <form onSubmit={filterHandle} className='mt-10 text-center'>
             <input type='text' name='search' placeholder="Search...." className="border-2 border-black pt-1 pb-1 pl-3 pr-3" />
             <select name='sortz' className="ml-3 border-2 border-black pt-1 pb-1 pl-3 pr-3" >
              <option value="DESC">ใหม่ไปเก่า</option>
              <option value="ASC">เก่าไปใหม่</option>
             </select>
             <button type='submit' className="ml-3 border-2 border-black pt-1 pb-1 pl-5 pr-5">Search</button>
          </form>

          <div className='mt-5 border-[0.5px] border-black w-[500px] mx-auto pt-4 px-3'>
            {quotes.length > 0 ? (
              <>
                {quotes.map(item => (
                  <div key={item.id} className='py-3 px-5 bg-blue-200 border border-solid border-blue-400 rounded-md mb-5'>
                    <div className='mb-2 text-center text-xl'>{item.textz}</div>
                    {/* <div className='text-right text-xs' style={stylesome}>{ new Date(item.created_at).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' }) }</div> */}
                    {item.voted_by!=null ? (
                      <div className='text-center text-xs text-green-800'>Voted by: { item.voted_name }</div>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </>
            ) : (
                <div className='text-center text-3xl mb-4'>No Quote</div>
            )}
          </div>

      </div>
    </div>
  );
}

