import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TeamMember } from "@/types/index";
import { addMemberToProject } from "@/api/TeamAPI";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};

export default function SearchResult({ user, reset }: SearchResultProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // get project id
  const params = useParams();
  const projectId = params.projectId!;

  // mutation to add member to proyecto on button click
  const { mutate } = useMutation({
    mutationFn: addMemberToProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
    },
  });

  const handleAddMemberToProject = () => {
    const data = { projectId, id: user._id };
    mutate(data);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-lg">{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-100 px-10 py-3 text-lg font-bold cursor-pointer transition-colors"
          onClick={handleAddMemberToProject}
        >
          Agregar al Proyecto
        </button>
      </div>
    </>
  );
}
