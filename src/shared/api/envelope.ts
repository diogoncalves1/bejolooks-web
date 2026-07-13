/**
 * Todas as respostas do backend vêm embrulhadas neste formato, ex:
 * { success: true, message: "OK", errors: null, data: { ... } }
 */
export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  errors: unknown;
  data: T;
}
