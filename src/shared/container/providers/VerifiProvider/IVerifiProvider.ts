export interface IVerifiProvider {
  verifica(text: string, size: number): Promise<boolean>;
}
