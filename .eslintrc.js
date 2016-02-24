module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },

  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },

  "plugins": [
    "react"
  ],
  "extends": "eslint:recommended",

  "rules": {
    "indent": [2, 2],
    "linebreak-style": [2, "unix"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "no-console": [0],

    "react/jsx-uses-vars": [2],
    "react/jsx-uses-react": [2],
    "react/display-name": [2]
  }
};
