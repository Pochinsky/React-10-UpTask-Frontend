import AddMemberModal from "@/components/team/AddMemberModal";
import { useNavigate } from "react-router-dom";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  return (
    <section>
      <h1 className="text-5xl font-black">Colaboradores</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Administra el equipo de trabajo para este proyecto
      </p>
      <nav className="my-5 flex flex-col gap-8 md:flex-row-reverse md:justify-between">
        <button
          type="button"
          className="bg-fuchsia-400 hover:bg-fuchsia-500 px-10 py-3 text-white text-xl cursor-pointer transition-colors"
          onClick={() => navigate(location.pathname.split("/team")[0])}
        >
          Volver al Proyecto
        </button>
        <button
          type="button"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          onClick={() => navigate(location.pathname + "?addMember=true")}
        >
          Agregar Colaborador
        </button>
      </nav>
      <AddMemberModal />
    </section>
  );
}
