# Robot

My robot assignment

## Docker
Docker build will run unit tests before compiling the bundle.
```
docker build -t psxcode/assignment:latest .
```
Then run it
```
printf "2\n10 22\nE 2\nN 1" | docker run -i --rm --name ass psxcode/assignment
```

## Run locally
> Make sure you have all deps installed. Just run `yarn install`
```
printf "2\n10 22\nE 2\nN 1" | node -r ./register.js ./src
```

## Test locally
> Make sure you have all deps installed. Just run `yarn install`
```
yarn test
```
