module.exports = {
  ENTRY_POINT: 'src/index.js',
  HTML: 'src/index.html',
  OUT: 'bundle.js',
  MINIFIED_OUT: 'bundle.min.js',
  DEST: '../server/public',
  LOGO: 'Logo.jsx',
  SRC: ['src/**/*.js', 'src/**/*.jsx', '!src/**/*.test.jsx'],
  DEV_API_URL: 'https://localhost:3443/api',
  PROD_API_URL: 'https://means.starduv.com/api',
};
