const { execSync } = require('child_process');
const path = require('path');
const os = require('os');

const hodosPath = path.join(os.homedir(), 'Documents/HODOS/HODOS');
try {
  console.log('Installing HODOS dependencies...');
  execSync('npm install --silent', { cwd: hodosPath, stdio: 'inherit' });
  console.log('✓ HODOS dependencies installed');
} catch (error) {
  console.error('Failed to install HODOS dependencies:', error.message);
  process.exit(1);
}
