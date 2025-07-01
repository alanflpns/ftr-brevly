import Logo from "../../../assets/small-logo.svg";

interface Props {
  originLink?: string;
}

export function Redirecting({ originLink }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 my-auto bg-white rounded-lg px-12 py-16">
      <Logo />
      <h1 className="text-xl">Redirecionando...</h1>
      <div className="font-bold text-gray-500 text-center">
        <span>O link será aberto automaticamente em alguns instantes.</span>
        <div>
          <span>Não foi redirecionado?</span>{" "}
          <a
            className="text-blue-base underline cursor-pointer"
            href={originLink}
          >
            Acesse aqui
          </a>
        </div>
      </div>
    </div>
  );
}
