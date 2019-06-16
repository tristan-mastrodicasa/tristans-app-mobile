/**
 * Interface for all response objects from the server,
 * <T> is the type of object / array containing the content
 */
export interface Response<T> {
  error: {
    exists: boolean,
    errorInfo?: any
  };
  content?: T;
}

/**
 * Content type Options
 */

export interface Profile {
  id: string;
  firstName: string;
  username: string;
  influence: number;
  followers: number;
  contentNumber: number;
  photo: string;
}

export interface UserItem {
  id: string;
  firstName: string;
  username: string;
  influence: number;
  photo: string;
  activeCanvases?: number; // Number of active canvases
}
