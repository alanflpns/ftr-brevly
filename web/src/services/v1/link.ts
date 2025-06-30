import api from "../instances/api";
import type {
  LinkCSVResponse,
  LinkResponse,
  OriginLinkResponse,
} from "../../interfaces/link";

export const LinkService = {
  getLinks: async () => {
    return await api.get<LinkResponse>(`/links`);
  },
  downloadCSV: async () => {
    return await api.post<LinkCSVResponse>("/links/exports");
  },
  deleteLink: async (id: string) => {
    return await api.delete(`/links/${id}`);
  },
  getOriginLink: async (shortLink: string) => {
    return await api.get<OriginLinkResponse>(`/links/${shortLink}`);
  },
};
