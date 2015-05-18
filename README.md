## Flux web architecture
An application architecture for React utilizing a unidirectional data flow.
<a href="https://github.com/facebook/flux">![react flux architecture](https://raw.githubusercontent.com/facebook/flux/master/docs/img/flux-diagram-white-background.png)</a>

## React Flux Example App

### Environment Setup

```Shell
# install local redis server (Mac)
brew update
brew install redis

# open a new terminal window and start redis server
redis-server /usr/local/etc/redis.conf

# from project root folder, install gulp and npm dependencies
npm i -g gulp && npm install
```

### Run application

```Shell
# workaround error "Error: EMFILE, open ..."?
ulimit -n 2560

# start the dev server
gulp

# build minified js for production
gulp prod

```
