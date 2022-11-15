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
          <div className="top-categories-container   mx-4  flex-wrap flex flex-row">
            {categories && categories.length > 0  ? categories.slice(0 , 5).map((category ) => ( <div
              className="flex relative"
              onClick={(e) => {
                setShowSubCat({id : category._id , show : !showSubCat.show});
              }}
            >
              <div className="top-category-card w-[9rem] md:w-[14rem]">
                {category.name}
                <span className="top-category-card-icon">
                  <i className="fa-solid fa-chevron-down"></i>{" "}
                </span>{" "}
               
              {showSubCat.id == category._id && showSubCat.show ?  (
                <div className="absolute  bg-gray-100 shadow-md rounded-md  w-[9rem] md:w-[14rem] z-[100] top-[2.6rem] py-2 left-[.8rem] md:left-[1rem] lg:left-[1rem]">
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

      {/* show on phone screen */}
      {/* <div className="onPhone block md:hidden">
        <div className="top-categories-main-container">
          <div className="top-categories-container-phone ">
            <a
              href="#"
              className="flex justify-bewteen  rounded-md border border-[#355C7D] py-1 px-4 "
            >
              Men{" "}
              <span className="top-category-card-icon ml-3">
                <i className="fa-solid fa-chevron-down"></i>{" "}
              </span>{" "}
            </a>

            <a
              href="#"
              className="flex ml-2 justify-bewteen  rounded-md border border-[#355C7D] py-1 px-4 "
            >
              Women{" "}
              <span className="top-category-card-icon ml-3">
                <i className="fa-solid fa-chevron-down"></i>{" "}
              </span>{" "}
            </a>

            <a
              href="#"
              className="flex ml-2 justify-bewteen  rounded-md border border-[#355C7D] py-1 px-4 "
            >
              Phones{" "}
              <span className="top-category-card-icon ml-3">
                <i className="fa-solid fa-chevron-down"></i>{" "}
              </span>{" "}
            </a>

            <a
              href="#"
              className="flex ml-2 justify-bewteen  rounded-md border border-[#355C7D] py-1 px-4 "
            >
              Electronics{" "}
              <span className="top-category-card-icon ml-3">
                <i className="fa-solid fa-chevron-down"></i>{" "}
              </span>{" "}
            </a>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default TopCategories;
