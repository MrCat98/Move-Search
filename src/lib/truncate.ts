export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const cut = text.slice(0, maxLength);
  const lastSpaceIndex = cut.lastIndexOf(' ');

  // если пробел вообще есть в обрезанном куске — отступаем до него,
  // иначе (одно очень длинное "слово") оставляем жёсткую обрезку как есть
  const trimmed = lastSpaceIndex > 0 ? cut.slice(0, lastSpaceIndex) : cut;

  // убираем висящую пунктуацию перед многоточием (запятая/точка/пробел перед "...")
  return trimmed.replace(/[\s.,;:!?-]+$/, '') + '…';
}