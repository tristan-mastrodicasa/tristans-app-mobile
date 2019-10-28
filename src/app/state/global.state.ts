export class GlobalState {
  public jwt: string;
  public userId: number;

  public stagedCanvasPicture: string;
  public homeRefreshTrigger: boolean; // Subscribe to this state to know when to reload the home page

  /**
   * @todo implement a cache property which stores
   * the users network / profile etc, reload on log out
   */

}
