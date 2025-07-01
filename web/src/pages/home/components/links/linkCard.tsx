import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { IconButton } from "../../../../components/iconButton";
import type { Link } from "../../../../interfaces/link";
import { useMutation } from "@tanstack/react-query";
import { useLinkContext } from "../../contexts/linkContext";
import { toast } from "react-toastify";

interface Props {
  link: Link;
}

export function LinkCard({ link }: Props) {
  const { query, deleteLink } = useLinkContext();

  const mutateDeleteLink = useMutation({
    mutationFn: (linkId: string) => deleteLink(linkId),
    onSuccess: () => {
      query.refetch();
    },
  });

  function handleCopyShortLink(shortUrl: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shortUrl).then(
        () => toast.info(`${shortUrl} copiado para a área de transferência.`),
        (err) => toast.error("Erro ao copiar o link:", err)
      );
    }
  }

  return (
    <div className="flex justify-between">
      <div
        className="flex flex-col mr-5 truncate cursor-pointer"
        onClick={() => window.open(link.shortUrl.value, "_blank")}
      >
        <span
          className="truncate text-blue-base font-semibold"
          title={link.shortUrl.formatted}
        >
          {link.shortUrl.formatted}
        </span>
        <span className="truncate text-sm text-gray-500" title={link.originUrl}>
          {link.originUrl}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <span className="truncate">{link.qtdAccess} acessos</span>
        <div className="flex gap-1">
          <IconButton
            onClick={() => handleCopyShortLink(link.shortUrl.formatted)}
          >
            <CopyIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              if (window.confirm("Tem certeza que deseja excluir este link?")) {
                mutateDeleteLink.mutate(link.id);
              }
            }}
            disabled={mutateDeleteLink.isPending}
            isLoading={mutateDeleteLink.isPending}
          >
            <TrashIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
