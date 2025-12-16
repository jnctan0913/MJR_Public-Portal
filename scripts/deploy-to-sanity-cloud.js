const { spawn } = require('child_process');

const token = 'skvOAz6HLHZAQoILxeOkgHPZg2ZRVcmPNvNzVSZreDoAhT2cwts6h8tXu9CQivo4mKQrFVbgUgna5GfPpdcT9kjmWGJigzfYIDFALqO3rX2duNo2X91YeAYpFYGVF7dGqgJ2i0qp1NlUWvSaPjGbm3IU4jvikJIUIzNIoSwzbfdyFjPyT2qI';
const hostname = 'mjr-obesity-management'; // This will be mjr-obesity-management.sanity.studio

console.log('🚀 Deploying Sanity Studio...');
console.log(`📝 Creating studio at: ${hostname}.sanity.studio`);

const deploy = spawn('npx', ['sanity', 'deploy', '--no-build'], {
  env: {
    ...process.env,
    SANITY_AUTH_TOKEN: token
  }
});

let step = 0;

deploy.stdout.on('data', (data) => {
  const output = data.toString();
  process.stdout.write(output);

  // Step 1: When asked to select hostname, choose "Create new"
  if (step === 0 && output.includes('Select existing studio hostname')) {
    setTimeout(() => {
      deploy.stdin.write('\n'); // Select first option (Create new)
      step = 1;
    }, 500);
  }

  // Step 2: When asked for hostname, provide it
  if (step === 1 && output.includes('Studio hostname')) {
    setTimeout(() => {
      deploy.stdin.write(`${hostname}\n`);
      step = 2;
    }, 500);
  }
});

deploy.stderr.on('data', (data) => {
  process.stderr.write(data);
});

deploy.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ Deployment successful!');
    console.log(`🌐 Your studio is now available at: https://${hostname}.sanity.studio`);
    console.log('\n📝 Next steps:');
    console.log('1. Visit the studio and sign in with event.dksh@gmail.com');
    console.log('2. Add sample clinics using SAMPLE_CLINICS_GUIDE.md');
    console.log('3. View results at http://localhost:3000/act-now');
  } else {
    console.error(`\n❌ Deployment failed with code ${code}`);
    process.exit(code);
  }
});

deploy.on('error', (error) => {
  console.error('❌ Deployment error:', error.message);
  process.exit(1);
});
