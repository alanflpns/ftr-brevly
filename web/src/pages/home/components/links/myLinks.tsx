import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "../../../../components/button";
import { EmptyList } from "./emptyList";
import { useMutation } from "@tanstack/react-query";
import { LinkCard } from "./linkCard";
import { useLinkContext } from "../../contexts/linkContext";
import { LoadingList } from "./loadingList";

export function MyLinks() {
  const { query, downloadCSV } = useLinkContext();

  const mutateDownloadCSV = useMutation({
    mutationFn: () => downloadCSV(),
  });

  return (
    <section className="bg-white rounded-lg p-8 flex flex-col h-fit flex-1/3 min-w-3xs">
      <div className="flex items-center justify-between">
        <h2 className="text-lg text-gray-600">Meus links</h2>
        <Button
          variant="secondary"
          icon={<DownloadSimpleIcon />}
          onClick={() => mutateDownloadCSV.mutate()}
          disabled={
            !query.data ||
            !query.data.links.length ||
            mutateDownloadCSV.isPending
          }
          isLoading={mutateDownloadCSV.isPending}
        >
          Baixar CSV
        </Button>
      </div>

      <div className="border-b border-gray-200 my-5" />

      {query.isLoading ? (
        <LoadingList />
      ) : (
        <div className="max-h-[calc(100dvh-320px)] overflow-auto flex flex-col gap-5">
          {query.data?.links.length ? (
            query.data.links.map((link, index, links) => (
              <div key={link.id}>
                <LinkCard link={link} />
                {index < links.length - 1 && (
                  <div className="border-b border-gray-200 mt-5" />
                )}
              </div>
            ))
          ) : (
            <EmptyList />
          )}
        </div>
      )}
    </section>
  );
}
