import superagent from 'superagent';
import config from '../config';
import cookie from 'react-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;

  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    // return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
    return `${config.apiHost}:${config.apiPort}${adjustedPath}`;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return `/api${adjustedPath}`;
}

export function getClientCookie() {
  return cookie.load('authToken', { path: '/' });
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { headers, params, data } = {}) =>
        new Promise((resolve, reject) => {
          const request = superagent[method](formatUrl(path));
          const authToken = (__SERVER__) ? req.cookies.authToken : getClientCookie();
          if (headers) {
            Object.keys(headers).forEach(header => {
              request.set(header, headers[header]);
            });
          }
          if (params) {
            request.query(params);
          }
          if (authToken && path !== '/signin' && path !== '/signup') {
            request.set('authorization', `${authToken}`);
          }
          if (data) {
            request.send(data);
          }
          request.end((err, { body } = {}) => {
            if (err) {
              reject(body || err);
            } else {
              resolve(body);
            }
          });
        })// .catch(err => console.log(err))
    );

    this.graphql = (string) => this.post('/graphql', {
      data: string,
      headers: {
        "Content-Type": "application/graphql"
      }
    });
  }
}
