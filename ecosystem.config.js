module.exports = {
  apps: [
    {
      name: 'web-api',
      script: './dist/apps/conso4s-web-api/src/main.js',
      instances: 1,
      exec_mode: 'cluster',
      watch: true,
      increment_var: 'HTTP_PORT',
      env: {
        HTTP_PORT: 5000,
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'core',
      script: './dist/apps/conso4s-core/src/main.js',
      instances: 1,
      exec_mode: 'cluster',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
