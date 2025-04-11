# Proj

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]

[npm-url]: https://npmjs.org/package/@huajs/demo
[npm-image]: http://img.shields.io/npm/v/@huajs/demo.svg

[downloads-url]: https://npmjs.org/package/@huajs/demo
[downloads-image]: http://img.shields.io/npm/dm/@huajs/demo.svg?style=flat-square

[travis-url]: https://travis-ci.org/react-component/m-steps
[travis-image]: http://img.shields.io/travis/react-component/m-steps.svg


- https://www.npmjs.com/~warmhug
- https://www.npmjs.com/org/huajs
- https://www.npmjs.com/org/warm_hug

## lint

```sh
npx prettier --write .
```

```json
{
  "gitHooks": {
    "pre-commit": "echo \"pre-commit: run...\" && exit 1"
  },
  "eslintConfig": {
    "extends": ["eslint:recommended", "plugin:prettier/recommended"]
  },
  "prettier": {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": [
      "pretty-quick --staged",
      "eslint --fix",
      "git add"
    ]
  },

  "gitHooks": {
    "pre-commit": "pretty-quick --staged"
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"]
  },
  "scripts": {
    "prepare": "husky install"
  }
}
```
