import React from "react";
import { TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { clientData, clientSchema } from "../pages/schemas/contacts.schema";
import { useAuth } from "../contexts/authContext";
import { zodResolver } from "@hookform/resolvers/zod";

function EditClientForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<clientData>({
    resolver: zodResolver(clientSchema),
  });
  const { editClient, isEditing } = useAuth();
  const onFormEditSubmit: SubmitHandler<clientData> = (formData) => {
    editClient(formData)
    console.log(formData);
  };
  return (
    <form className="w-3/4 h-3/4 border border-black flex flex-col space-y-2" onSubmit={handleSubmit(onFormEditSubmit)}>
      
      <div className="flex flex-col items-center">
        <p className=" mt-6 font-semibold mb-2">Editar Cliente</p>
        <TextField
          label="Nome"
          variant="outlined"
          type="text"
          {...register("name")}
          color={errors.name ? "error" : "success"}
        />
        {errors.name && <p className="text-red-500">{errors.name?.message}</p>}
      </div>
      <div className="flex flex-col items-center">
        <TextField
          label="Email"
          variant="outlined"
          type="text"
          {...register("email")}
          color={errors.email ? "error" : "success"}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <TextField
          label="Telefone"
          variant="outlined"
          type="text"
          {...register("telefone")}
          color={errors.telefone ? "error" : "success"}
        />
        {errors.telefone && (
          <p className="text-red-500">{errors.telefone?.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="border border-black rounded p-1 hover: cursor-pointer"
        disabled={isEditing}
      >
        {isEditing ? "Editando..." : "Editar"}
      </button>
      <button
        type="button"
        className="border border-black rounded p-1 hover: cursor-pointer"
        
      >
        Deletar conta
      </button>
    </form>
  );
}

export default EditClientForm;
