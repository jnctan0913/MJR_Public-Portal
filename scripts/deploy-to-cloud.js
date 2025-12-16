const { spawn } = require('child_process');

const token = process.env.SANITY_API_TOKEN || 'skf6b3bO0fZDGLfKkbqBN0eIvO0aLW31gjGmskd7ZlUwvUzCGTvcMHRPMP4IRt3jGFbZGGYHi0XgT2kx7eT97d9VbM2MkOS4DBfpQ4q91WrjUaFWRaph5bLimJ75HvKkLlqcQzkC1RBmirljbGerhzw5RL2I7Vd0WCzMZQ8Rr2VNqvjnwr1D';

console.log('🚀 Deploying Sanity Studio to mjr-public-portal.com...');

const deploy = spawn('npx', ['sanity', 'deploy', '--no-build'], {
  env: {
    ...process.env,
    SANITY_AUTH_TOKEN: token
  }
});

let hasSelectedHostname = false;

deploy.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);

  // When it shows the hostname selection, select the existing one
  if (!hasSelectedHostname && output.includes('mjr-public-portal.com')) {
    // Send down arrow to select the existing hostname, then enter
    setTimeout(() => {
      deploy.stdin.write('\x1B[B'); // Down arrow
      setTimeout(() => {
        deploy.stdin.write('\n'); // Enter
        hasSelectedHostname = true;
      }, 100);
    }, 500);
  }
});

deploy.stderr.on('data', (data) => {
  process.stderr.write(data);
});

deploy.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Deployment successful!');
    console.log('🌐 Your studio is now available at: http://mjr-public-portal.com');
  } else {
    console.error(`\n❌ Deployment failed with code ${code}`);
    process.exit(code);
  }
});

deploy.on('error', (error) => {
  console.error('❌ Deployment error:', error.message);
  process.exit(1);
});
