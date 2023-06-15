import Card from "@/components/card";
import { NextPage } from "next";
import React, { useEffect } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import ModalEdit from "@/components/modalEditClient";
import { useAuth } from "@/contexts/authContext";
import ModalCreateContact from "@/components/modalCreateContact";

const Home: NextPage = () => {
  const router = useRouter();

  const {
    modalEditClient,
    setModalEditClient,
    modalCreateContact,
    setModalCreateContact,
    client,
    contactList,
    getClient,
    getContactList
  } = useAuth();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
      router.push("/login");
    }
    getClient();
    getContactList()
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start relative`}
    >
      <header className="h-[80px] w-screen bg-slate-800 flex items-center justify-center">
        <div className="w-3/4 max-w-[1200px] flex items-center justify-between">
          <button
            className="bg-pink-500 text-white rounded p-1"
            onClick={() => {
              setModalCreateContact(true);
            }}
          >
            Cadastrar contato
          </button>
          <div className="flex items-center">
            <p className="border-white border-r text-white pr-2">
              {client?.name}
            </p>
            <button
              className="bg-pink-500 text-white rounded p-1 ml-2"
              onClick={() => {
                setModalEditClient(true);
              }}
            >
              Editar
            </button>
          </div>
        </div>
      </header>
      {modalEditClient && <ModalEdit />}
      {modalCreateContact && <ModalCreateContact />}
      <section className="w-3/4 max-w-[1200px]">
        <ul>
          {contactList.length == 0 ? (
            <p>Nenhum contato cadastrado</p>
          ) : (
            contactList.map((contact) => {
              return <Card key={contact.id} contact={contact} />;
            })
          )}
        </ul>
      </section>
    </main>
  );
};

export default Home;
