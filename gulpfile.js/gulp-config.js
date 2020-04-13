module.exports = {
  ENTRY_POINT: 'src/index.js',
  HTML: 'src/index.html',
  OUT: 'bundle.js',
  MINIFIED_OUT: 'bundle.min.js',
  AUTH_ENTRY_POINT: 'src/auth.js',
  AUTH_HTML: 'src/auth.html',
  AUTH_OUT: 'auth-bundle.js',
  AUTH_MINIFIED_OUT: 'auth-bundle.min.js',
  DEST: 'dist',
  LOGO: 'src/Logo.jsx',
  SRC: [
    'src/**/*.js',
    'src/**/*.jsx',
    '!src/auth-app/*',
    '!src/**/*.test.jsx',
  ],
  AUTH_SRC: ['../src/auth-app/**/*.js', '../src/auth-app/**/*.jsx'],
};
