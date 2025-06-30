import Logo from "../../assets/logo.svg";
import { FormLink } from "./components/form/formLink";
import { MyLinks } from "./components/links/myLinks";

export function Home() {
  return (
    <main className="h-full w-full flex flex-col items-center px-3 py-8">
      <div className="w-full flex flex-col gap-8 my-auto max-w-5xl">
        <Logo />
        <div className="flex flex-wrap gap-5 mb-8">
          <FormLink />
          <MyLinks />
        </div>
      </div>
    </main>
  );
}
