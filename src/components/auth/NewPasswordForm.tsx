import type { NewPasswordForm } from "@/types/index";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
  token: string;
};

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
  const navigate = useNavigate();

  // initial values to form fields
  const initialValues: NewPasswordForm = {
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  // mutation to change password on form submit
  const { mutate } = useMutation({
    mutationFn: updatePasswordWithToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      navigate("/auth/login");
    },
  });

  const handleNewPassword = (formData: NewPasswordForm) => {
    const data = { formData, token };
    mutate(data);
  };

  const password = watch("password");

  return (
    <section>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Contraseña</label>

          <input
            type="password"
            placeholder="********"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Confirma tu contraseña</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="********"
            className="w-full p-3  border-gray-300 border"
            {...register("password_confirmation", {
              required: "Se debe repetir la contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no son iguales",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Establecer Contraseña"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </section>
  );
}
