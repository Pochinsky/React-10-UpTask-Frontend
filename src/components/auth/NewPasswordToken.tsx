import { validateToken } from "@/api/AuthAPI";
import {
  PinInputRoot,
  PinInputHiddenInput,
  PinInputControl,
  PinInputInput,
  ChakraProvider,
  defaultSystem,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import type { Dispatch } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
  setToken: Dispatch<React.SetStateAction<string>>;
  setIsValidToken: Dispatch<React.SetStateAction<boolean>>;
};

export default function NewPasswordToken({
  setToken,
  setIsValidToken,
}: NewPasswordTokenProps) {
  // use mutation to validate code on pin input comlete
  const { mutate } = useMutation({
    mutationFn: validateToken,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      setIsValidToken(true);
    },
  });

  // @ts-expect-error: no access to token type definition
  const handleComplete = (value) => {
    setToken(value.valueAsString);
    mutate({ token: value.valueAsString });
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <form className="space-y-8 p-10 mt-10 rounded-lg bg-white">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInputRoot otp onValueComplete={handleComplete}>
            <PinInputHiddenInput />
            <PinInputControl>
              <PinInputInput
                className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={0}
                maxLength={1}
              />
              <PinInputInput
                className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={1}
                maxLength={1}
              />
              <PinInputInput
                className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={2}
                maxLength={1}
              />
              <PinInputInput
                className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={3}
                maxLength={1}
              />
              <PinInputInput
                className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={4}
                maxLength={1}
              />
              <PinInputInput
                className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-gray-300"
                index={5}
                maxLength={1}
              />
            </PinInputControl>
          </PinInputRoot>
        </div>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </ChakraProvider>
  );
}
