import React from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ConfirmOrder() {
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width : '60%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
    <Navbar />
    <div className="flex flex-col justify-center items-center mx-auto my-5 w-11/12 md:w-5/12">
        <p className="text-gray-400 my-2">Confirm Your ORDER Please !</p>
        <div className="flex flex-row w-full">
            <input type="text" name="" className='w-full py-1 px-4 border-2 rounded-md mr-2' placeholder='First Name ..' id="" />
            <input type="text" name="" className='w-full py-1 px-4 border-2 rounded-md ml-2' placeholder='Last Name ...' id="" />
        </div>
            <div className="w-full mt-3">
            <input type="text" name="" className='w-full py-1 px-4 border-2 rounded-md' placeholder='Email Address ....' id="" />
            </div>
            <div className="w-full mt-3">
            <input type="number" name="" className='w-full py-1 px-4 border-2 rounded-md' placeholder='Phone Number ...' id="" />
            </div>
            <div className="w-full mt-3">
            <div className="flex flex-row w-full">
            <input type="text" name="" className='w-full py-1 px-4 border-2 rounded-md mr-2' placeholder='City ..' id="" />
            <input type="text" name="" className='w-full py-1 px-4 border-2 rounded-md ml-2' placeholder='Zip code ...' id="" />
        </div>
            </div>
            <div className="w-full mt-3">
            <input type="text" name="" className='w-full py-6 px-4 border-2 rounded-md' placeholder='Address' id="" />
            </div>
            <div className="w-full flex flex-row justify-center mt-3">
               <button onClick={openModal} className="py-1 px-5 themeClrBg text-white font-bold rounded-md">Confirm</button>
            </div>
        
    </div>
    


    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-row justify-end">
        <button onClick={closeModal} className="py-2 px-4 themeClrBg rounded-full font-bold">x</button>
        </div>
        <div className=' text-2xl font-bold  text-green-700 flex flex-row justify-center items-center bg-gray-100 rounded-md mt-2 h-40'>ThankYou For Trusting US 😍❤</div>

      </Modal>
      <Footer />
    </>
  )
}
