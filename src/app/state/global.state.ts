export class GlobalState {
  public initialized = false;
  public userInitialized = false;

  public jwt_token: string;
  public user_data: any;

  public pictureTaken = false;
  public pictureData: string;
}
