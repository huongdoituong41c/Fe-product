import { FaLocationDot, FaPhone, FaTwitter, FaFacebookF, FaSquareInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";

const Header = () => {
  return (
    <div className='w-full px-10 bg-black mx-auto'>
      <div className='w-full flex flex-wrap'>
        <div className='text-left mb-0 flex w-2/3'>
          <div className='h-[45px] items-center inline-flex'>
            <small className='text-[#f5f5f5] mr-3 flex items-center'>
              <FaLocationDot className='mr-2' />
              123 Street, New York, USA
            </small>
            <small className='text-[#f5f5f5] mr-3 flex items-center'>
              <FaPhone className='mr-2' />
              +012 345 6789
            </small>
            <small className='text-[#f5f5f5] flex items-center'>
              <IoMailSharp className='mr-2 w-4 h-4' />
              mail@domain.com
            </small>
          </div>
        </div>
        <div className='text-right flex w-1/3 justify-end'>
          <div className="h-[45px] items-center inline-flex space-x-3">
            <span className="p-0 flex items-center justify-center font-normal w-[32px] h-[32px] transition-[.5s] rounded-[50%] text-[.875rem] text-[#f5f5f5] border-[#f5f5f5] leading-[1.5] text-center align-middle cursor-pointer select-none bg-transparent border mr-0">
              <FaTwitter />
            </span>
            <span className="p-0 flex items-center justify-center font-normal w-[32px] h-[32px] transition-[.5s] rounded-[50%] mr-2 text-[.875rem] text-[#f5f5f5] border-[#f5f5f5] leading-[1.5] text-center align-middle cursor-pointer select-none bg-transparent border">
              <FaFacebookF />
            </span>
            <span className="p-0 flex items-center justify-center font-normal w-[32px] h-[32px] transition-[.5s] rounded-[50%] mr-2 text-[.875rem] text-[#f5f5f5] border-[#f5f5f5] leading-[1.5] text-center align-middle cursor-pointer select-none bg-transparent border">
              <FaLinkedinIn />
            </span>
            <span className="p-0 flex items-center justify-center font-normal w-[32px] h-[32px] transition-[.5s] rounded-[50%] mr-2 text-[.875rem] text-[#f5f5f5] border-[#f5f5f5] leading-[1.5] text-center align-middle cursor-pointer select-none bg-transparent border">
              <FaSquareInstagram />
            </span>
            <span className="p-0 flex items-center justify-center font-normal w-[32px] h-[32px] transition-[.5s] rounded-[50%] text-[.875rem] text-[#f5f5f5] border-[#f5f5f5] leading-[1.5] text-center align-middle cursor-pointer select-none bg-transparent border">
              <FaYoutube />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
