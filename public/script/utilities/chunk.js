

export function getChunkKey(x, z) {
  return `${Math.floor(x / 50)}_${Math.floor(z / 50)}`;
}
