export interface Response {
  error: {
    exists: boolean,
    errorInfo?: any
  };
  content?: any;
}
