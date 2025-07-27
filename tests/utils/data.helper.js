export function randomUsername(prefix = "user") {
  return `${prefix}-${Math.floor(Math.random() * 1_000_000)}`;
}
