import Link from "next/link";
import { TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/authContext";
import { LoginData, loginSchema } from "./schemas/user.schema";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const { loginClient } = useAuth();
  const onFormLoginSubmit: SubmitHandler<LoginData> = (formData) => {
    loginClient(formData);
    console.log(formData);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <form
  className="min-w-[150px] w-3/4 max-w-[500px] min-h-96 border border-black flex flex-col justify-center items-center py-2"
  onSubmit={handleSubmit(onFormLoginSubmit)}
>
        <p className="text-4xl mt-6 font-semibold mb-2">Login</p>
        <div className="w-4/5 space-y-[20px] flex flex-col items-center py-1" >
          
          <div className="flex flex-col items-center">
            <TextField label="Email" variant="outlined" type="text" {...register('email') } color= {errors.email ? 'error' : 'success'}/>
            {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
          </div>
          <div className="flex flex-col items-center">
            <TextField label="Senha" variant="outlined" type="text" {...register('password')} color= {errors.password ? 'error' : 'success'}/>
            {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
          </div>
          <button type="submit" className="border border-black rounded p-1 hover: cursor-pointer">Entrar</button>
          <p>Não está cadastrado ainda?</p>
          <Link href={'/'} className='hover: cursor-pointer'>Cadastre-se</Link>
        </div>
      </form>
    </main>
  )
}

export default Login