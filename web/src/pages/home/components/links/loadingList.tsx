import { Spinner } from "@radix-ui/themes";

export function LoadingList() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Spinner size="3" />
      <span className="text-xs text-gray-500">Carregando Links</span>
    </div>
  );
}
