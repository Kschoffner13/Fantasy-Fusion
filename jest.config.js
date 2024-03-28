module.exports = {
    preset: 'ts-jest', // Use this if you're using TypeScript
    testEnvironment: 'node',
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest', // Transform both JavaScript and TypeScript files
      },
    // Additional configuration options
  };
  