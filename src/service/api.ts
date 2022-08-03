export class API {
  private endpoints = {
    pets: '/pets',
    users: '/users',
  };

  private base_url = 'http://35.188.210.98';

  public async pets(): Promise<string> {
    try {
      let request = await fetch(this.base_url + this.endpoints.pets);

      if (request.ok) {
        let response = await request.text();
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error('failed to convert data'))
      }
    } catch (error) {
      throw error;
    }
  }

  public users() {}
}
