# Clicktool Code Challenge

## Requirements
* node `^5.0.0`
* yarn `^0.23.0` or npm `^3.0.0`

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can doing the following:

```bash
$ git clone https://github.com/hellogovus/dashboard.git <my-project-name>
$ cd <my-project-name>
```

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ yarn dev  # Start the development server (or `npm dev`)
```



## Tools and Libraries

### Immutable.js
We use `immutable` to enforce an immutable data structure within a React / Redux application. Learn more about [immutable collections](https://facebook.github.io/immutable-js/) within Javascript

### Axios
We use `axios` as a promise based http client for making AJAX calls. Learn more about [axios](https://github.com/mzabriskie/axios)

### React Semantic UI
We use `react-semantic-ui` an official port of the [Semantic UI](http://react.semantic-ui.com) framework. This allows us
to utilize this ui framework with pure and data driven react components.
