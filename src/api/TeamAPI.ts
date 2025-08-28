import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { TeamMemberForm, Project, TeamMember } from "@/types/index";

type findMemberByEmailProps = {
  projectId: Project["_id"];
  formData: TeamMemberForm;
};

export async function findMemberByEmail({
  projectId,
  formData,
}: findMemberByEmailProps) {
  try {
    const url = `/projects/${projectId}/team/find`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}

type addMemberToProjectProps = {
  projectId: Project["_id"];
  id: TeamMember["_id"];
};

export async function addMemberToProject({
  projectId,
  id,
}: addMemberToProjectProps) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.post(url, { id });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.error);
  }
}
