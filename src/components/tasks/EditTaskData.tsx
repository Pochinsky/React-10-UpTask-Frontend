import { Navigate, useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "@/api/TaskAPI";
import EditTaskModal from "./EdiTaskModal";

export default function EditTaskData() {
  const params = useParams();
  const location = useLocation();

  // get project id
  const projectId = params.projectId!;

  // get task id
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;

  // query to get task by id
  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
  });

  if (isError) return <Navigate to="/404" />;
  if (data) return <EditTaskModal data={data} taskId={taskId} />;
}
