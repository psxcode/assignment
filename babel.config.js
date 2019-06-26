module.exports = function (api) {
  switch (api.env()) {
  case 'test': {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '8',
            },
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        'istanbul',
      ],
      sourceMaps: true,
      retainLines: true,
    }
  }
  default:
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: '8',
            },
          },
        ],
        '@babel/preset-typescript',
      ],
      plugins: [
        '@babel/plugin-transform-runtime',
      ],
    }
  }
}
