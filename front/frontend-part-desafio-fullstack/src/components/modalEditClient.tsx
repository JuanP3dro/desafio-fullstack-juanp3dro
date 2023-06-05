import React from "react";
import EditClientForm from "./editClientForm";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "@/contexts/authContext";

function ModalEdit() {
  const {setModalEditClient} = useAuth()
  return (
    <div className="modalBg">
      <div className="modalInnerContainer">
        <div className="close" >
          <AiOutlineClose className="hover:cursor-pointer" onClick={()=> {setModalEditClient(false)}}/>
        </div>
        <EditClientForm />
      </div>
    </div>
  );
}

export default ModalEdit;
