export class LinkAlreadyExists extends Error {
  constructor() {
    super("Link with this short URL already exists");
  }
}
