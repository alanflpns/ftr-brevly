import { LinkService } from "../../../services/v1/link";

export function useRedirectLink() {
  async function getOriginLink(shortLink: string) {
    const response = await LinkService.getOriginLink(shortLink);
    const originLink = response.data.originUrl;

    return { originLink };
  }

  function redirectToOriginLink(originLink: string) {
    window.location.href = `${originLink}`;
  }

  return {
    getOriginLink,
    redirectToOriginLink,
  };
}
