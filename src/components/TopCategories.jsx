import axios from "axios";
import { useState, useEffect } from "react";


function TopCategories() {
  const [showSubCat, setShowSubCat] = useState({});
  const [categories, setCategories] = useState([]);
  const getAllCat = async () => {
    const res = await axios.get("https://ennmart.herokuapp.com/category/");
    console.log(res);
    setCategories(res.data);
  };

  useEffect(() => {
    getAllCat();
  }, []);

  return (
    <>
      <div className="">
        <p className="my-3 px-2 themeClrText font-bold">Popular Categories</p>
        <div className="top-categories-main-container">
          <div className="top-categories-container   mx-4 flex-wrap justify-center flex flex-row">
            {categories && categories.length > 0  ? categories.slice(0 , 6).map((category ) => ( <div
              className="flex relative"
              onClick={(e) => {
                setShowSubCat({id : category._id , show : !showSubCat.show});
              }}
            >
              <div className="top-category-card w-[9rem] md:w-[10rem]">
                {category.name}
                <span className="top-category-card-icon">
                  <i className="fa-solid fa-chevron-down"></i>{" "}
                </span>{" "}
               
              {showSubCat.id == category._id && showSubCat.show ?  (
                <div className="absolute  bg-gray-100 shadow-md rounded-md  w-[9rem] md:w-[10rem] z-[100] top-[2.6rem] py-2 left-[.8rem] md:left-[1rem] lg:left-[1rem]">
                  <ul className="flex flex-col justify-center items-center">
                  {category.subCategories.map(item => ( <li className="mt-2 font-bold">{item}</li>) )}
                   
                  </ul>
                </div>
              )  : (
                ""
                )}
                </div>
            </div>)) : ""}           

          </div>
        </div>
      </div>

     
    </>
  );
}

export default TopCategories;
