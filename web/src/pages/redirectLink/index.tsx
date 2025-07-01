import { useNavigate, useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";
import { useRedirectLink } from "./hooks/useRedirectLink";
import { useEffect } from "react";
import { NotFound } from "./components/notFound";
import { Redirecting } from "./components/redirecting";

export function RedirectLink() {
  const { shortLink } = useParams<{ shortLink: string }>();

  const navigate = useNavigate();

  const { getOriginLink, redirectToOriginLink } = useRedirectLink();

  const { data, isError } = useQuery({
    queryKey: ["originLink", shortLink],
    queryFn: () => {
      if (!shortLink) return;

      return getOriginLink(shortLink);
    },
  });

  useEffect(() => {
    if (data?.originLink) {
      redirectToOriginLink(data.originLink);
    }
  }, [data, navigate, redirectToOriginLink]);

  return (
    <main className="h-full w-full flex flex-col items-center px-3 py-8">
      {isError ? <NotFound /> : <Redirecting originLink={data?.originLink} />}
    </main>
  );
}
