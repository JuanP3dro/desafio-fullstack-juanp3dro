import { clientData, contactData, createContactData } from "@/pages/schemas/contacts.schema";
import { LoginData, UserData } from "@/pages/schemas/user.schema";
import api from "@/pages/services/api";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

interface Props {
  children: ReactNode;
}

interface authProviderData {
  registerClient: (userData: UserData) => void;
  loginClient: (loginData: LoginData) => void;
  editClient: (clientData: clientData) => void;
  createContact: (contactData: clientData) => void;
  isEditing: boolean;
  modalEditClient: boolean;
  setModalEditClient: React.Dispatch<React.SetStateAction<boolean>>;
  modalCreateContact: boolean;
  setModalCreateContact: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

function AuthProvider({ children }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [modalEditClient, setModalEditClient] = useState(false);
  const [modalCreateContact, setModalCreateContact] = useState(false);

  const cookies = parseCookies();
  const token = cookies.token;
  const decodedToken = jwt.decode(token);
  const idClient = decodedToken?.sub as string;

  const router = useRouter();

  const registerClient = (userData: UserData) => {
    api
      .post("/clients", userData)

      .then(() => {
        toast.success("usuário cadastrado com sucesso!");
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao criar usuário, tente utilizar outro e-mail!");
      });
  };

  const loginClient = (loginData: LoginData) => {
    api
      .post("/auth", loginData)
      .then((response) => {
        setCookie(null, "token", response.data.token),
          {
            maxAge: 60 * 60,
            path: "/",
          };
      })
      .then(() => {
        toast.success("login realizado com sucesso!");
        router.push("/home");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Erro ao logar, verifique se o e-mail e senha estão corretos!"
        );
      });
  };

  const createContact = (contactData: createContactData) => {
    api
      .post("/contacts", contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("login realizado com sucesso!");
        router.push("/home");
      })
      .then(() => {
        setModalCreateContact(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "Erro ao cadastrar, verifique os dados fornecidos."
        );
      });
  };

  const editClient = async (clientData: clientData) => {
    setIsEditing(true);
    try {
      await api.patch(`/clients/${idClient}`, clientData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
    } finally {
      setIsEditing(false);
    }
  };

  // const deleteClient = async () => {

  // }

  return (
    <AuthContext.Provider
      value={{
        registerClient,
        loginClient,
        editClient,
        isEditing,
        modalEditClient,
        setModalEditClient,
        modalCreateContact,
        setModalCreateContact,
        createContact
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
