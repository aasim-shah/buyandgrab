

function TopCategories() {
  return (
    <>
        <div className="desktop hidden md:block">
        <div className="top-categories-main-container">
            <div className="top-categories-container">
                <a href="#" className="top-category-card">Mart <span className='top-category-card-icon'><i className="fa-solid fa-chevron-down"></i> </span> </a>

                <a href="#" className="top-category-card">Fasion <span className='top-category-card-icon'><i className="fa-solid fa-chevron-down"></i> </span></a>
                <a href="#" className="top-category-card">Electronics <span className='top-category-card-icon'><i className="fa-solid fa-chevron-down"></i> </span></a>
                <a href="#" className="top-category-card">Beauty <span className='top-category-card-icon'><i className="fa-solid fa-chevron-down"></i> </span></a>
                <a href="#" className="top-category-card">Mobiles <span className='top-category-card-icon'><i className="fa-solid fa-chevron-down"></i> </span></a>

                <a href="#" className="top-category-card">Mart <span className='top-category-card-icon'><i className="fa-solid fa-chevron-down"></i> </span> </a>
                
                </div>
        </div>
        </div>


        {/* show on phone screen */}
        <div className="onPhone block md:hidden">
        <div className="top-categories-main-container">
            <div className="top-categories-container-phone ">
                <a href="#" className="flex justify-bewteen  rounded-md border border-[#355C7D] py-1 px-4 ">Men <span className='top-category-card-icon ml-3'><i className="fa-solid fa-chevron-down"></i> </span> </a>

                <a href="#" className="flex ml-2 justify-bewteen  rounded-md border border-[#355C7D] py-1 px-4 ">Women <span className='top-category-card-icon ml-3'><i className="fa-solid fa-chevron-down"></i> </span> </a>
                

                <a href="#" className="flex ml-2 justify-bewteen  rounded-md border border-[#355C7D] py-1 px-4 ">Phones <span className='top-category-card-icon ml-3'><i className="fa-solid fa-chevron-down"></i> </span> </a>

                <a href="#" className="flex ml-2 justify-bewteen  rounded-md border border-[#355C7D] py-1 px-4 ">Electronics <span className='top-category-card-icon ml-3'><i className="fa-solid fa-chevron-down"></i> </span> </a>


                </div>
        </div>
        </div>
    </>
  )
}

export default TopCategories