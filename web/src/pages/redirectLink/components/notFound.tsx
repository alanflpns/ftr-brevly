import { useNavigate } from "react-router";
import NotFoundImage from "../../../assets/404.svg";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 my-auto bg-white rounded-lg px-12 py-16">
      <NotFoundImage />
      <h1 className="text-xl">Link não encontrado</h1>
      <div className="font-bold text-gray-500 text-center">
        <span>
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida.
        </span>
        <div>
          <span>Saiba mais em</span>{" "}
          <a
            className="text-blue-base underline cursor-pointer"
            onClick={() => navigate("/", { replace: true })}
          >
            brev.ly.
          </a>
        </div>
      </div>
    </div>
  );
}
