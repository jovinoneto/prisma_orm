export function VerifyEmpty(text: string, size: number) {
  if (text !== undefined) {
    const verifyEmpty = text.split(' ').join('');

    if (verifyEmpty.length < size) {
      return true;
    }
    return false;
  }
}
