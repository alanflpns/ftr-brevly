import { LinkIcon } from "@phosphor-icons/react";

export function EmptyList() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <LinkIcon className="text-4xl text-gray-400" />
      <span className="text-xs text-gray-500">
        Ainda não existem links cadastrados
      </span>
    </div>
  );
}
