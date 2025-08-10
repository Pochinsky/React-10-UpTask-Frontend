import ErrorMessage from "@/components/ErrorMessage";
import type { ProjectFormData } from "@/types/index";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>;
  errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ register, errors }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">
          Nombre del proyecto
        </label>
        <input
          id="projectName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Ej: CRM"
          {...register("projectName", {
            required: "El nombre del proyecto es obligatorio",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="clientName" className="text-sm uppercase font-bold">
          Nombre del cliente
        </label>
        <input
          id="clientName"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Ej: Distribuidora SPA"
          {...register("clientName", {
            required: "El nombre del cliente es obligatorio",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm uppercase font-bold">
          Descripción
        </label>
        <textarea
          id="description"
          className="w-full p-3  border border-gray-200"
          placeholder="Describa las principales características del proyecto"
          {...register("description", {
            required: "La descripción del proyecto es obligatoria",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
