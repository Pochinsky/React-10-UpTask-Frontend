import { deleteNote } from "@/api/NoteAPI";
import { useAuth } from "@/hooks/useAuth";
import type { Note } from "@/types/index";
import { formatDate } from "@/utils/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailsProps = { note: Note };

export default function NoteDetails({ note }: NoteDetailsProps) {
  const params = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { data, isLoading } = useAuth();

  // get project id
  const projectId = params.projectId!;

  // get task id
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      toast.success(data);
    },
  });

  if (isLoading) return "Cargando...";

  if (data)
    return (
      <div className="flex justify-between items-center py-2">
        <div>
          <p>
            {note.content} por{" "}
            <span className="font-bold">{note.createdBy.name}</span>
          </p>
          <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
        </div>
        {canDelete && (
          <button
            type="button"
            className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer"
            onClick={() => mutate({ projectId, taskId, noteId: note._id })}
          >
            Eliminar
          </button>
        )}
      </div>
    );
}
