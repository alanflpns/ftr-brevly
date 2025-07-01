/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { LinkService } from "../../../services/v1/link";
import type { Link } from "../../../interfaces/link";
import { formatDate } from "../../../infra/adapters/dateAdapter";
import { envConfig } from "../../../env";

interface LinkContextType {
  data?: {
    links: Link[];
  };
  refetch: () => void;
  createLink: (data: { originUrl: string; shortUrl: string }) => Promise<void>;
  getAllLinks: () => Promise<{ links: Link[] }>;
  downloadCSV: () => Promise<void>;
  deleteLink: (linkId: string) => Promise<void>;
}

interface createContextProviderProps {
  children: ReactNode;
}

export const LinkContext = createContext({} as LinkContextType);

export function LinkContextProvider({ children }: createContextProviderProps) {
  const { data, refetch } = useQuery({
    queryKey: ["links"],
    queryFn: () => getAllLinks(),
  });

  const createLink = useCallback(
    async (data: { originUrl: string; shortUrl: string }) => {
      await LinkService.createLink(data);
    },
    []
  );

  const getAllLinks = useCallback(async () => {
    const response = await LinkService.getLinks();

    const links = response.data.links;

    const formattedData: Link[] = links.map((link) => ({
      id: link.id,
      originUrl: link.originUrl,
      shortUrl: {
        value: `${envConfig.VITE_FRONTEND_URL}/${link.shortUrl}`,
        formatted: `${envConfig.VITE_FRONTEND_URL.replace(
          /^https?:\/\/?/,
          ""
        )}/${link.shortUrl}`,
      },
      qtdAccess: link.qtdAccess,
      createdAt: {
        value: link.createdAt,
        formatted: formatDate(link.createdAt, "DD/MM/YYYY"),
      },
    }));

    return { links: formattedData };
  }, []);

  const downloadCSV = useCallback(async () => {
    const response = await LinkService.downloadCSV();

    const url = response.data.reportUrl;

    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const deleteLink = useCallback(async (linkId: string) => {
    await LinkService.deleteLink(linkId);
  }, []);

  return (
    <LinkContext.Provider
      value={{
        data,
        refetch,
        createLink,
        getAllLinks,
        downloadCSV,
        deleteLink,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
}

export function useLinkContext() {
  const context = useContext(LinkContext);

  if (!context) {
    throw new Error(
      "useLinkContext must be used within an LinkContextProvider"
    );
  }

  return { ...context };
}
