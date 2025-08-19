import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PinInputRoot,
  PinInputHiddenInput,
  PinInputControl,
  PinInputInput,
} from "@chakra-ui/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // @ts-expect-error: the library definition is wrong
  const handleChange = (e) => setCode(e.value);

  // mutation to confirm account on complete code
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  // @ts-expect-error: no access to token type definition
  const handleComplete = (value) => mutate({ token: value.valueAsString });

  return (
    <ChakraProvider value={defaultSystem}>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInputRoot
            otp
            value={code}
            onChange={handleChange}
            onValueComplete={handleComplete}
          >
            <PinInputHiddenInput />
            <PinInputControl>
              <PinInputInput
                className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={0}
                maxLength={1}
              />
              <PinInputInput
                className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={1}
              />
              <PinInputInput
                className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={2}
              />
              <PinInputInput
                className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={3}
              />
              <PinInputInput
                className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={4}
              />
              <PinInputInput
                className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={5}
              />
            </PinInputControl>
          </PinInputRoot>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/new-code"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </ChakraProvider>
  );
}
