export class LinkAlreadyExists extends Error {
  constructor() {
    super("Essa URL encurtada já existe");
  }
}
