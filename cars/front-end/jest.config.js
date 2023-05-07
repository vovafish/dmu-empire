// Export an object that specifies how to transform code and which presets to use for Jest testing
module.exports = {
  // Use Babel to transform .js and .jsx files
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // Ignore code in /node_modules/ directory, except for 'my-module'
  transformIgnorePatterns: ['/node_modules/(?!my-module)'],
  // Use '@babel/preset-env' with target set to 'node: current'
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
