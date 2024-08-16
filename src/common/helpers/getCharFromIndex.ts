/** if input 0, return 'A', if input 1, return 'B', ... */
export function getCharFromIndex(index: number) {
  return String.fromCharCode(65 + index);
}

export function getIndexFromChar(char: string) {
  return char.charCodeAt(0) - 65;
}
