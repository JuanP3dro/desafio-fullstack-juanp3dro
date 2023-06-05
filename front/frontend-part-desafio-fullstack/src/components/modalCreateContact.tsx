import React from "react";
import EditClientForm from "./editClientForm";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "@/contexts/authContext";
import CreateContactForm from "./createContactForm";

function ModalCreateContact() {
  const {setModalCreateContact} = useAuth()
  return (
    <div className="modalBg">
      <div className="modalInnerContainer">
        <div className="close" >
          <AiOutlineClose className="hover:cursor-pointer" onClick={()=> {setModalCreateContact(false)}}/>
        </div>
        <CreateContactForm/>
      </div>
    </div>
  );
}

export default ModalCreateContact;