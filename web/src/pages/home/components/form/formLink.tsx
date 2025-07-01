import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { useMutation } from "@tanstack/react-query";
import { useLinkContext } from "../../contexts/linkContext";

const formSchema = z.object({
  originUrl: z.string().url({ message: "Informe uma url válida" }),

  shortUrl: z.string().regex(/^[a-z0-9-_]+$/i, {
    message: "Informe uma url minuscula e sem espaços/caracteres especiais",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function FormLink() {
  const { createLink, refetch } = useLinkContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mutateCreateLink = useMutation({
    mutationFn: (data: { originUrl: string; shortUrl: string }) =>
      createLink(data),
    onSuccess: () => {
      refetch();
      reset();
    },
  });

  async function handleCreateLink(data: FormData) {
    mutateCreateLink.mutate(data);
  }

  return (
    <section className="bg-white rounded-lg p-8 flex flex-col gap-6 flex-1 h-fit">
      <h2 className="text-lg text-gray-600">Novo link</h2>

      <form onSubmit={handleSubmit(handleCreateLink)}>
        <div className="mb-6 flex flex-col gap-4">
          <Input
            label="Link Original"
            placeholder="www.exemplo.com.br"
            error={errors.originUrl?.message}
            {...register("originUrl")}
          />

          <Input
            label="Link Encurtado"
            prefix="brev.ly/"
            error={errors.shortUrl?.message}
            {...register("shortUrl")}
          />
        </div>

        <Button type="submit">Salvar link</Button>
      </form>
    </section>
  );
}
