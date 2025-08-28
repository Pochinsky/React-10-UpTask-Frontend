import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import { useMemo } from "react";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const params = useParams();
  const { data: user, isLoading: isAuthLoading } = useAuth();

  // get project id
  const projectId = params.projectId!;

  // useQuery to get project that will be edite
  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  const canEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading || isAuthLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;

  if (data && user)
    return (
      <section>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        <nav className="my-5 flex flex-col gap-8 md:flex-row-reverse md:justify-between">
          <button
            type="button"
            className="text-purple-500 hover:bg-purple-100 px-10 py-3 text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate("/")}
          >
            Volver a mis Proyectos
          </button>
          {isManager(data.manager, user._id) && (
            <div className="flex flex-col gap-8 md:flex-row-reverse">
              <Link
                to={"team"}
                className="bg-purple-500 hover:bg-purple-600 px-10 py-3 text-white text-xl text-center font-bold cursor-pointer transition-colors"
              >
                Colaboradores
              </Link>
              <button
                type="button"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                onClick={() => navigate(location.pathname + "?newTask=true")}
              >
                Agregar Tarea
              </button>
            </div>
          )}
        </nav>
        <TaskList tasks={data.tasks} canEdit={canEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </section>
    );
}
