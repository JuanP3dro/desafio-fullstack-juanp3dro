import {
  ClientData,
  ContactData,
  CreateContactData,
  EditClientData,
} from "../pages/schemas/contacts.schema";
import { LoginData, UserData } from "../pages/schemas/user.schema";
import api from "../pages/services/api";
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
  editClient: (clientData: ClientData) => void;
  createContact: (contactData: CreateContactData) => void;
  getClient: () => void;
  getContactList:() => void;
  isEditing: boolean;
  isCreating: boolean;
  modalEditClient: boolean;
  setModalEditClient: React.Dispatch<React.SetStateAction<boolean>>;
  modalCreateContact: boolean;
  setModalCreateContact: React.Dispatch<React.SetStateAction<boolean>>;
  client: ClientData;
  contactList: ContactData[];
}

const AuthContext = createContext<authProviderData>({} as authProviderData);

function AuthProvider({ children }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [modalEditClient, setModalEditClient] = useState(false);
  const [modalCreateContact, setModalCreateContact] = useState(false);
  const [contactList, setContactList] = useState<ContactData[]>([]);
  const [client, setClient] = useState<ClientData>({
    id: "",
    name: "",
    email: "",
    telefone: ''
  });

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

  const getClient = async () => {
    try {
      const loggedClient = await api.get<ClientData>(`/clients/${idClient}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClient(loggedClient.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getContactList = async () => {
    try {
      const contacts = await api.get<ContactData[]>("/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredContacts = contacts.data.filter(
        (contact) => contact.clientId == idClient
      );
      setContactList(filteredContacts);
    } catch (error) {
      console.log(error);
    }
  };

  const createContact = async (contactData: CreateContactData) => {
    setIsCreating(true);
    try {
      await api.post("/contacts", contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Contato cadastrado com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      setModalCreateContact(false);
      setIsCreating(false);
      getContactList()
    }
  };

  const editClient = async (clientData: EditClientData) => {
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
      setModalEditClient(false);
      getClient()
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
        getClient,
        isEditing,
        modalEditClient,
        setModalEditClient,
        modalCreateContact,
        setModalCreateContact,
        createContact,
        isCreating,
        client,
        contactList,
        getContactList
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
