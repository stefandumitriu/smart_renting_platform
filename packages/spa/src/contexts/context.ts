export interface ContextValue<T> {
  value: T;
  setValue: (value: T) => void;
}
