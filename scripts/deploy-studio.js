const { execSync } = require('child_process');
const readline = require('readline');
const { spawn } = require('child_process');

const token = process.env.SANITY_API_TOKEN || 'skKoOKa5mgM7rjnjF4CYPP01k3R7JQIRUfnA063Zb3BrXrqfvlumJ6TpBzEuKE2XP1UPddXJLzj3lLpV7GaVTWfEKoIsY7UpmfsxuvMi0ZyDhX364HhgI9wMlf9W8ENv8ctD7zlmBjmKBtATtGKO3VmobB7o7uH204wkTmU6dYzLN47O5kV3';
const hostname = 'mjr-obesity-trial';

console.log('🚀 Starting Sanity Studio deployment...');
console.log(`📝 Using hostname: ${hostname}.sanity.studio`);

// Run sanity deploy with automatic input
const deploy = spawn('npx', ['sanity', 'deploy', '--no-build'], {
  env: {
    ...process.env,
    SANITY_AUTH_TOKEN: token
  }
});

let hasProvidedHostname = false;

deploy.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);

  // If it asks for hostname, provide it
  if (!hasProvidedHostname && output.includes('Studio hostname')) {
    deploy.stdin.write(`${hostname}\n`);
    hasProvidedHostname = true;
  }
});

deploy.stderr.on('data', (data) => {
  process.stderr.write(data);
});

deploy.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Deployment successful!');
    console.log(`🌐 Your studio is now available at: https://${hostname}.sanity.studio`);
  } else {
    console.error(`\n❌ Deployment failed with code ${code}`);
    process.exit(code);
  }
});

// Handle errors
deploy.on('error', (error) => {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
});
