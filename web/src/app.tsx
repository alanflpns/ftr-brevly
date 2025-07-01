import { Route, Routes } from "react-router";
import { Home } from "./pages/home";
import { RedirectLink } from "./pages/redirectLink";
import { NotFound } from "./pages/redirectLink/components/notFound";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:shortLink" element={<RedirectLink />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
