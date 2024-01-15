import { FaAngleRight, FaTwitter, FaFacebookF, FaSquareInstagram, FaYoutube, FaLinkedinIn, FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <div className='w-full mx-auto bg-black text-white pt-5 py-2 px-4'>
      <div className='w-[1320px] mx-auto py-5'>
        <div className='grid grid-cols-4 gap-4'>
          <div className='grid grid-rows-5 text-white'>
            <h4 className='mb-3 text-2xl font-extrabold'>Company</h4>
            <span className='flex mb-[5px] p-0 text-left text-[15px] font-normal capitalize transition-[.3s] align-middle leading-[1.5] cursor-pointer select-none items-center'>
              <FaAngleRight className='mr-3' />
              About Us
            </span>
            <span className='flex mb-[5px] p-0 text-left text-[15px] font-normal capitalize transition-[.3s] align-middle leading-[1.5] cursor-pointer select-none items-center'>
              <FaAngleRight className='mr-3' />
              Contact Us
            </span>
            <span className='flex mb-[5px] p-0 text-left text-[15px] font-normal capitalize transition-[.3s] align-middle leading-[1.5] cursor-pointer select-none items-center'>
              <FaAngleRight className='mr-3' />
              Privacy Policy
            </span>
            <span className='flex mb-[5px] p-0 text-left text-[15px] font-normal capitalize transition-[.3s] align-middle leading-[1.5] cursor-pointer select-none items-center'>
              <FaAngleRight className='mr-3' />
              FAQs & Help
            </span>
          </div>
          <div className='grid grid-rows-5 text-white'>
            <h4 className='mb-3 text-2xl font-extrabold'>Contact</h4>
            <span className='flex mb-[5px] p-0 text-left text-[15px] font-normal capitalize transition-[.3s] align-middle leading-[1.5] cursor-pointer select-none items-center'>
              <FaLocationDot className='mr-3' />
              123 Street, New York, USA
            </span>
            <span className='flex mb-[5px] p-0 text-left text-[15px] font-normal capitalize transition-[.3s] align-middle leading-[1.5] cursor-pointer select-none items-center'>
              <FaPhone className='mr-3' />
              +012 345 67890
            </span>
            <span className='flex mb-[5px] p-0 text-left text-[15px] font-normal capitalize transition-[.3s] align-middle leading-[1.5] cursor-pointer select-none items-center'>
              <IoMailSharp className='mr-3' />
              mail@domain.com
            </span>
            <div className="flex pt-2">
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
          <div className='text-white pr-5'>
            <h4 className='mb-3 text-2xl font-extrabold'>Gallery</h4>
            <div className="grid grid-cols-3 gap-4 mt-7">
              <div className="w-full h-full">
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/281027675.jpg?k=28963e06bf924e5358ea93ffa8e4810a81e47afe7974cc17888cb689d3ae0240&o=&hp=1" alt="" className="bg-[#f5f5f5] p-1 w-full h-full align-middle object-cover" />
              </div>
              <div className="w-full h-full">
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/281027675.jpg?k=28963e06bf924e5358ea93ffa8e4810a81e47afe7974cc17888cb689d3ae0240&o=&hp=1" alt="" className="bg-[#f5f5f5] p-1 w-full h-full align-middle object-cover" />
              </div>
              <div className="w-full h-full">
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/281027675.jpg?k=28963e06bf924e5358ea93ffa8e4810a81e47afe7974cc17888cb689d3ae0240&o=&hp=1" alt="" className="bg-[#f5f5f5] p-1 w-full h-full align-middle object-cover" />
              </div>
              <div className="w-full h-full">
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/281027675.jpg?k=28963e06bf924e5358ea93ffa8e4810a81e47afe7974cc17888cb689d3ae0240&o=&hp=1" alt="" className="bg-[#f5f5f5] p-1 w-full h-full align-middle object-cover" />
              </div>
              <div className="w-full h-full">
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/281027675.jpg?k=28963e06bf924e5358ea93ffa8e4810a81e47afe7974cc17888cb689d3ae0240&o=&hp=1" alt="" className="bg-[#f5f5f5] p-1 w-full h-full align-middle object-cover" />
              </div>
              <div className="w-full h-full">
                <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/281027675.jpg?k=28963e06bf924e5358ea93ffa8e4810a81e47afe7974cc17888cb689d3ae0240&o=&hp=1" alt="" className="bg-[#f5f5f5] p-1 w-full h-full align-middle object-cover" />
              </div>
            </div>
          </div>
          <div className="text-white">
            <h4 className='mb-3 text-2xl font-extrabold'>Newsletter</h4>
            <p className="mt-5">Enter email to receive the latest information</p>
            <div className="mt-7 flex space-x-3 items-center">
              <input type="email" placeholder="Enter your email" className="" />
              <button className="font-semibold px-3 bg-[#86B817] border-[#86B817] leading-[1.5] text-center align-middle cursor-pointer select-none border rounded-lg text-white h-10">Send</button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[1320px] mx-auto'></div>
    </div>
  )
}

export default Footer
