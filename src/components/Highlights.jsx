import React from "react";

export default function Highlights() {
  return (
    <>
      <div className="highlights-container">
        <div className="highlights-inner">
          <div className="highlights-single">
            <div className="highlights-icon text-[3rem]">
              <i className="fa-solid fa-truck  truck"></i>
            </div>
            <div className="text-[16px] md:text-[1.4rem] text-center">Free Shipping</div>
            <div className="text-[13px] mt-3 md:text-[1rem] text-center">
              Get free shipping on your orders all over Pakistan.
            </div>
          </div>

          <div className="highlights-single">
            <div className="highlights-icon  text-[3rem]">
              <i className="fa-solid fa-retweet"></i>
            </div>
            <div className=" text-[16px] md:text-[1.4rem] text-center">Secure Transactions</div>
            <div className="text-[13px] mt-3 md:text-[1rem] text-center">
              15 days No Question Asked Return Policy asdfas  asdf as f sdafasdf
            </div>
          </div>

          <div className="highlights-single">
            <div className="highlights-icon text-[3rem]">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div className="text-[16px] md:text-[1.4rem] text-center">Quality Products</div>
            <div className="text-[13px] mt-3 md:text-[1rem] text-center">
              We always go for the best. Premium product and             </div>
          </div>
        </div>
      </div>
    </>
  );
}
