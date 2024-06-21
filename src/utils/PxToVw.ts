export default function pxToVw(px: number): string {
  const viewportWidth = 1920;
  return `${(px / viewportWidth) * 100}vw`;
}
