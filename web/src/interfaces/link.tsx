import type { IFormatValue } from ".";

export interface LinkResponse {
  links: LinkResponseItem[];
}

export interface LinkResponseItem {
  id: string;
  originUrl: string;
  shortUrl: string;
  qtdAccess: number;
  createdAt: string;
}

export interface Link extends Omit<LinkResponseItem, "createdAt"> {
  createdAt: IFormatValue<string>;
}

export interface LinkCSVResponse {
  reportUrl: string;
}

export interface OriginLinkResponse {
  originUrl: string;
}
