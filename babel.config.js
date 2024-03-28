module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current', // This ensures Babel uses the current version of Node
          },
        },
      ],
    ],
  };
  