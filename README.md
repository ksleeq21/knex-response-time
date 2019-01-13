# Node.js knex app

Print logs if the knex query response time exceeds the threshold.

## Usage

Create .env from env.sample and replace MySQL variables with correct data.

Install dependencies using the command `npm i`.

Launch the application using the command `npm start`.

Once the application has started, visit the following URLs via
a browser or cURL:

* <http://localhost:8080/?user_id=3>

For example:

```sh
$ curl -i "http://localhost:8080/?user_id=3"
HTTP/1.1 200 OK
Content-Type: text/html
Date: Sun, 13 Jan 2019 22:37:15 GMT
Connection: keep-alive
Transfer-Encoding: chunked

Found user: ID: Mr James Kook Tue Jan 01 1985 16:00:00 GMT-0800 (PST)
```

## License
