import { useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import ThankingModal from "../../components/ThankingModal";

import ConfirmOrderForm from "./ConfirmOrderForm";
import ConfirmOrderDetails from "./ConfirmOrderDetails";

export default function ConfirmOrder() {

  return (
    <>
      <Navbar />

     <div className="flex flex-col sm:flex-row gap-4">
     <ConfirmOrderDetails/>
      <ConfirmOrderForm/>
     </div>
      <ThankingModal
        btnTitle={""}
        btnStyle={"hidden"}
        modalText={"Thanks Trusting Us Again 😍🔥"}
      />

      <Footer />
    </>
  );
}
