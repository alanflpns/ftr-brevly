export function validateSlug(str: string) {
  return /^[a-zA-Z0-9-_]+$/.test(str);
}
