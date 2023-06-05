import Link from "next/link";
import { TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserData, userSchema } from "./schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });
  const { registerClient } = useAuth();
  const onFormRegisterSubmit: SubmitHandler<UserData> = (formData) => {
    registerClient(formData);
    console.log(formData);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <form
        className="min-w-[150px] w-3/4 max-w-[500px] min-h-96 border border-black flex flex-col justify-center items-center py-2"
        onSubmit={handleSubmit(onFormRegisterSubmit)}
      >
        <p className="text-4xl mt-6 font-semibold mb-2">Cadastro</p>
        <div className="w-4/5 space-y-[20px] flex flex-col items-center py-1">
          <div className="flex flex-col items-center">
            <TextField
              label="Nome"
              variant="outlined"
              type="text"
              {...register("name")}
              color={errors.name ? "error" : "success"}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name?.message}</p>
            )}
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
          <div className="flex flex-col items-center">
            <TextField
              label="Senha"
              variant="outlined"
              type="text"
              {...register("password")}
              color={errors.password ? "error" : "success"}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="border border-black rounded p-1 hover: cursor-pointer"
          >
            Cadastrar
          </button>
          <p>Já possui cadastro?</p>
          <Link href={"/login"} className="hover: cursor-pointer">
            Login
          </Link>
        </div>
      </form>
    </main>
  );
}
