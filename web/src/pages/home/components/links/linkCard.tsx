import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { IconButton } from "../../../../components/iconButton";
import type { Link } from "../../../../interfaces/link";
import { useMutation } from "@tanstack/react-query";
import { useLinkContext } from "../../contexts/linkContext";

interface Props {
  link: Link;
}

export function LinkCard({ link }: Props) {
  const { refetch, deleteLink } = useLinkContext();

  const mutateDeleteLink = useMutation({
    mutationFn: (linkId: string) => deleteLink(linkId),
    onSuccess: () => {
      refetch();
    },
  });

  function handleCopyShortLink(shortUrl: string) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shortUrl).then(
        () => console.log("Texto copiado com sucesso!"),
        (err) => console.error("Erro ao copiar texto:", err)
      );
    }
  }

  return (
    <div className="flex justify-between">
      <div className="flex flex-col mr-5 truncate cursor-pointer">
        <span
          className="truncate text-blue-base font-semibold"
          title={link.shortUrl}
        >
          {link.shortUrl}
        </span>
        <span className="truncate text-sm text-gray-500" title={link.originUrl}>
          {link.originUrl}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <span className="truncate">{link.qtdAccess} acessos</span>
        <div className="flex gap-1">
          <IconButton onClick={() => handleCopyShortLink(link.shortUrl)}>
            <CopyIcon />
          </IconButton>
          <IconButton onClick={() => mutateDeleteLink.mutate(link.id)}>
            <TrashIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
