import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";

export function FormLink() {
  return (
    <section className="bg-white rounded-lg p-8 flex flex-col gap-6 flex-1 h-fit">
      <h2 className="text-lg text-gray-600">Novo link</h2>

      <form onSubmit={() => {}}>
        <div className="mb-6 flex flex-col gap-4">
          <Input label="Link Original" placeholder="www.exemplo.com.br" />
          <Input label="Link Encurtado" />
        </div>

        <Button type="submit">Salvar link</Button>
      </form>
    </section>
  );
}
