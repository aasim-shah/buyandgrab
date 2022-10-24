

function AllCategories() {
  return (
    <>
    <div className="onDesktop hidden md:block">

      <div className="allCategories-heading">
        <p className="heading-text">All Categories</p>
      </div>
    </div>

      <div className="onPhone block md:hidden">
      <div className="flex justify-between my-3 mx-5">
        <p className="font-bold mb-0 pt-2">
          Categories  
        </p>
        <div className="viewMore bg-[#355C7D] py-1 px-4 rounded-[2rem] text-white font-bold">
          More
        </div>
      </div>
      </div>



      <div className="card-container">

        <div className="card-inner-tut">
          <img src="images/mens.png" alt="" className="card-img" />
          <div className="card-title">
            MENS
          </div>
         
        </div>




        <div className="card-inner-tut">
          <img src={"images/womens-category.jpg"} alt="" className="card-img" />
          <div className="card-title">
           WOMENS
          </div>
          
        </div>


        <div className="card-inner-tut">
          <img src={"images/fasion.png"} alt="" className="card-img" />
          <div className="card-title">
            FASION
          </div>
          
        </div>

        
        <div className="card-inner-tut">
          <img src={"images/girl-fashion.jpg"} alt="" className="card-img" />
          <div className="card-title">
            KIDS
          </div>
       
        </div>


      </div>
    </>
  );
}

export default AllCategories;
