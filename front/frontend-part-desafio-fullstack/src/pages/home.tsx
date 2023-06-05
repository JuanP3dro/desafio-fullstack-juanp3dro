import Card from "@/components/card";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import { clientData, contactData } from "./schemas/contacts.schema";
import api from "./services/api";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import { useRouter } from 'next/router';
import ModalEdit from "@/components/modalEditClient";
import { useAuth } from "@/contexts/authContext";
import ModalCreateContact from "@/components/modalCreateContact";

interface HomeProps {
  contacts: contactData[];
  client: clientData | null;
}

const Home: NextPage<HomeProps> = ({ contacts, client }) => {
  const router = useRouter();

  const {modalEditClient, setModalEditClient, modalCreateContact, setModalCreateContact} = useAuth()

useEffect(() => {
  const cookies = parseCookies();
  const token = cookies.token;

  if (!token) {
    router.push('/login'); 
  }
}, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start relative`}
    >
      <header className="h-[80px] w-screen bg-slate-800 flex items-center justify-center">
        <div className="w-3/4 max-w-[1200px] flex items-center justify-between">
          <button className="bg-pink-500 text-white rounded p-1" onClick={()=> {setModalCreateContact(true)}}>Cadastrar contato</button>
          <div className="flex items-center">
            <p className="border-white border-r text-white pr-2">{client?.name}</p>
            <button className="bg-pink-500 text-white rounded p-1 ml-2" onClick={()=> {setModalEditClient(true)}}>Editar</button>
          </div>
        </div>
      </header>
      {modalEditClient && <ModalEdit/>}
      {modalCreateContact && <ModalCreateContact/>}
      <section className="w-3/4 max-w-[1200px]">
        <ul>
          {contacts.length == 0 ? (
            <p>Nenhum contato cadastrado</p>
          ) : (
            contacts.map((contact) => {
              return <Card key={contact.id} contact={contact} />;
            })
          )}
        </ul>
      </section>
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  req,
}) => {
  const headers = req.headers;
  const token = headers.cookie?.split("=")[1]; // Obtenha o valor do cookie que contém o token
  let decodedToken;
  let id: string = "";
  if (token) {
    decodedToken = jwt.decode(token);
    if (typeof decodedToken?.sub === "string") {
      id = decodedToken.sub;
    } else if (typeof decodedToken?.sub === "function") {
      id = decodedToken.sub();
    }
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.get<contactData[]>("/contacts", config);
    const filteredContacts = response.data.filter(
      (contact) => contact.clientId == id
    );
    const client = await api.get<clientData>(`/clients/${id}`, config);
    return {
      props: {
        contacts: filteredContacts,
        client: client.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        contacts: [],
        client: null,
      },
    };
  }
};
