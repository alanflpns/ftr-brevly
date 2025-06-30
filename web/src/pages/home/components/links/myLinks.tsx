import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "../../../../components/button";
import { EmptyList } from "./emptyList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLinks } from "../../hooks/useLinks";
import { LinkCard } from "./linkCard";

export function MyLinks() {
  const { getAllLinks, downloadCSV } = useLinks();

  const { data, refetch } = useQuery({
    queryKey: ["links"],
    queryFn: () => getAllLinks(),
  });

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
          disabled={!data || !data.links.length}
        >
          Baixar CSV
        </Button>
      </div>

      <div className="border-b border-gray-200 my-5" />

      <div className="max-h-[calc(100dvh-320px)] overflow-auto flex flex-col gap-5">
        {data?.links.length ? (
          data.links.map((link, index, links) => (
            <div key={link.id}>
              <LinkCard link={link} refetch={refetch} />
              {/* <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} />
              <LinkCard key={link.id} link={link} refetch={refetch} /> */}
              {index < links.length - 1 && (
                <div className="border-b border-gray-200 mt-5" />
              )}
            </div>
          ))
        ) : (
          <EmptyList />
        )}
      </div>
    </section>
  );
}
