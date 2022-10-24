import React from "react";
import { useState } from "react";
import { Link  } from "react-router-dom";

export default function AdminSidebar({setViewSidebar }) {
  const [isOpen, setIsOpen] = useState("");

  const data = [
    {
      title: "Home",
      icon : "fa-sharp fa-solid fa-house",
      hasLinks : false,
      to : '/admin'
    },
    {
      title: "Products ",
      icon : "fa-solid fa-list",
      hasLinks : true,
      to : '',
      links: [
        {  name: "View Products" , to : "/admin/view_products" },
        {  name: "Add Product" , to : "/admin/add_product"},
      ],
    },
    {
      title: "Categories ",
      icon : "fa-solid fa-list",
      hasLinks : true,
      to : '',
      links: [
        {  name: "View Categories" , to : "/admin/all_categories"},
        {  name: "Add Categories" , to : "/admin/add_category"},
        {  name: "Edit Categories" , to : "/admin/edit_category"},
      ],
    },
  ];

  return (
    <>
    <div className=" w-6/12 shadow-lg shadow-black top-0 sm:top-10 sm:w-3/12 md:w-[21%] absolute bg-gray-200  h-[100vh] sm:h-[95vh]  ">
      <span className="flex sm:hidden float-right right-3 top-2 absolute text-xl font-bold" onClick={()=>{setViewSidebar(false)}}>x</span>
      <div className="dashboard  pt-12   flex justify-center items-center">
        <p className="text-[1.5rem] my-10 font-bold text-[#355b7d] italic">
          Dashboard
        </p>
      </div>
      <div className="">
        {data.map((item) => (
          <div  key={item.title} >
            <Link
            to={item.to}
            className={item.title === isOpen ? 'text-[#355b7d]  cursor-pointer flex flex-row '   : "cursor-pointer flex flex-row"} onClick={() => { isOpen !== item.title ? setIsOpen(item.title) : setIsOpen("")}}
            >
              <div className={item.title === isOpen ? "flex  mt-5 border-l-4 border-[#355b7d]" : "hidden"}></div>
              <span className="w-4/12 text-end mt-5  hover:pr-1 transition-all duration-100"><i className={item.icon}></i></span>
              <span className="w-8/12  mt-5 font-bold text-center transition-all duration-100 hover:pl-2">{item.title}</span>
              <span className=""></span>

            </Link>
            {item.hasLinks
              ? item.links.map((link) => (
                    <div
                      key={link.name}
                      className={
                        isOpen === item.title
                          ? "block ml-14  flex flex-row text-sm cursor-pointer hover:pr-3 justify-center my-2 transition-all duration-100"
                          : "hidden"
                      }
                    > <Link to={link.to} >
                      {link.name}
                    </Link>
                    </div>
                ))
              : ""}
              </div>
        ))}
      </div>
      </div>
    </>
  );
}
