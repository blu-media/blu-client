import decode from 'jwt-decode';

export default class AuthService {
  constructor(endpoint) {
    // API Service Endpoint
    this.apiEndpoint = endpoint || `${process.env.REACT_APP_SERVER_URL}`;
    this.fetch = this.fetch.bind(this);
    this.signIn = this.signIn.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  fetch(url, options) {
    return fetch(url, options)
      .then(this.checkStatus)
      .then(response => response.json());
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      // Success Case
      return response;
    } else {
      // Failure Case: Raises an error.
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  // signIn(token, profile) {
  //   const tokenBlob = new Blob(
  //     [JSON.stringify({ access_token: token }, null, 2)],
  //     { type: 'application/json' }
  //   );

  //   const options = {
  //     method: 'POST',
  //     body: tokenBlob,
  //     mode: 'cors',
  //     cache: 'default'
  //   };

  //   return this.fetch(`${this.apiEndpoint}/auth/google`, options)
  //     .then((response) => {
  //       console.log("THIS IS MY RESPONSE");
  //       this.setToken(response.token);
  //       return Promise.resolve(response);
  //     });
  // }

  signIn(token, profile) {
    return new Promise((resolve, reject) => {
      const profileAndToken = JSON.stringify({
        access_token: token,
        profile: profile
      });

      const options = {
        method: 'POST',
        body: profileAndToken,
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
      };

      fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/google`, options)
        .then(response => {
          const token = response.headers.get('x-auth-token');
          if (token) {
            this.setToken(token);
            resolve(true);
          } else {
            reject(false);
          }
        })
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) return true;
      else return false;
    } catch (error) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem('idToken', idToken);
  }

  getToken() {
    return localStorage.getItem('idToken');
  }

  logout() {
    localStorage.removeItem('idToken');
  }

  getProfile() {
    try {
      return decode(this.getToken());
    } catch (error) {
      return null;
    }
  }
}
