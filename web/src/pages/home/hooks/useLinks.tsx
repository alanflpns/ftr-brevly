import { formatDate } from "../../../infra/adapters/dateAdapter";
import type { Link } from "../../../interfaces/link";
import { LinkService } from "../../../services/v1/link";

export function useLinks() {
  async function getAllLinks() {
    const response = await LinkService.getLinks();

    const links = response.data.links;

    const formattedData: Link[] = links.map((link) => ({
      id: link.id,
      originUrl: link.originUrl,
      shortUrl: link.shortUrl,
      qtdAccess: link.qtdAccess,
      createdAt: {
        value: link.createdAt,
        formatted: formatDate(link.createdAt, "DD/MM/YYYY"),
      },
    }));

    return { links: formattedData };
  }

  async function downloadCSV() {
    const response = await LinkService.downloadCSV();

    const url = response.data.reportUrl;

    const link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function deleteLink(linkId: string) {
    await LinkService.deleteLink(linkId);
  }

  return {
    getAllLinks,
    downloadCSV,
    deleteLink,
  };
}
