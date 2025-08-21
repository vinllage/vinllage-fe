module.exports = {
  apps: [
    {
      name: 'vinllage-fe',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3100',
      instances: 1,
      exec_mode: 'cluster',
    },
  ],
}
