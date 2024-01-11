import React,{useState,useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router-dom'


export default function Spinner() {

  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    const interval = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);
    count === 0 && navigate("/login",{
      state:location.pathname
    });
    return () => clearInterval(interval);
    // eslint-disable-next-lin
  },[count,navigate,location]);
  return (
    <div className='h-[100vh] w-full flex justify-center items-center'>
      <img className='h-10 w-10 animate-spin' src="/images/image-removebg-preview.png" alt="" />
      <br />
      <h1>Redirecting to you in {count}</h1>
    </div>
  );
}
