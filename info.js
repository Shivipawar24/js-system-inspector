const os = require('os');
const path = require('path');

const getSystemInfo = () => {
  return {
    operatingSystem: {
      type: os.type(),
      platform: os.platform(),
      release: os.release(),
      version: os.version(),
      arch: os.arch(),
      endianness: os.endianness()
    },
    hostname: os.hostname(),
    cpu: {
      architecture: os.arch(),
      cores: os.cpus().length,
      model: os.cpus()[0]?.model || 'N/A',
      speed: os.cpus()[0]?.speed ? `${os.cpus()[0].speed} MHz` : 'N/A'
    },
    nodeVersion: process.version,
    platformInfo: {
      platform: os.platform(),
      type: os.type(),
      uptime: `${Math.floor(os.uptime() / 3600)} hours`
    },
    userInfo: {
      homeDirectory: os.homedir(),
      username: os.userInfo().username,
      uid: os.userInfo().uid,
      gid: os.userInfo().gid
    },
    memory: {
      total: `${Math.round(os.totalmem() / (1024 * 1024 * 1024) * 100) / 100} GB`,
      free: `${Math.round(os.freemem() / (1024 * 1024 * 1024) * 100) / 100} GB`
    },
    network: os.networkInterfaces()
  };
};

const getSelectedEnvVars = () => {
  const selectedVars = [
    'PATH',
    'HOME',
    'USER',
    'NODE_ENV',
    'PORT',
    'SHELL',
    'TERM',
    'EDITOR'
  ];
  
  const result = {};
  selectedVars.forEach(varName => {
    result[varName] = process.env[varName] || 'Not set';
  });
  return result;
};

const displaySystemInfo = () => {
  console.log('='.repeat(50));
  console.log('SYSTEM INFORMATION');
  console.log('='.repeat(50));
  
  const info = getSystemInfo();
  
  console.log('\n[OPERATING SYSTEM DETAILS]');
  console.log(`  Type: ${info.operatingSystem.type}`);
  console.log(`  Platform: ${info.operatingSystem.platform}`);
  console.log(`  Release: ${info.operatingSystem.release}`);
  console.log(`  Architecture: ${info.operatingSystem.arch}`);
  console.log(`  Endianness: ${info.operatingSystem.endianness}`);
  
  console.log('\n[CPU INFORMATION]');
  console.log(`  Architecture: ${info.cpu.architecture}`);
  console.log(`  Cores: ${info.cpu.cores}`);
  console.log(`  Model: ${info.cpu.model}`);
  console.log(`  Speed: ${info.cpu.speed}`);
  
  console.log('\n[NETWORK INTERFACES]');
  Object.keys(info.network).forEach(interfaceName => {
    console.log(`  ${interfaceName}:`);
    info.network[interfaceName].forEach(addr => {
      console.log(`    - ${addr.address} (${addr.family}${addr.internal ? ' - Internal' : ''})`);
    });
  });
  
  console.log('\n[SYSTEM METRICS]');
  console.log(`  Hostname: ${info.hostname}`);
  console.log(`  Node.js Version: ${info.nodeVersion}`);
  console.log(`  Platform: ${info.platformInfo.platform}`);
  console.log(`  Uptime: ${info.platformInfo.uptime}`);
  
  console.log('\n[USER INFORMATION]');
  console.log(`  Home Directory: ${info.userInfo.homeDirectory}`);
  console.log(`  Username: ${info.userInfo.username}`);
  console.log(`  UID: ${info.userInfo.uid}`);
  console.log(`  GID: ${info.userInfo.gid}`);
  
  console.log('\n[MEMORY INFORMATION]');
  console.log(`  Total Memory: ${info.memory.total}`);
  console.log(`  Free Memory: ${info.memory.free}`);
  
  console.log('\n[SELECTED ENVIRONMENT VARIABLES]');
  const envVars = getSelectedEnvVars();
  Object.keys(envVars).forEach(key => {
    const value = envVars[key];
    const displayValue = value === 'Not set' ? value : value.substring(0, 100) + (value.length > 100 ? '...' : '');
    console.log(`  ${key}: ${displayValue}`);
  });
  
  console.log('\n' + '='.repeat(50));
  
  return info;
};

if (require.main === module) {
  displaySystemInfo();
}

module.exports = {
  getSystemInfo,
  getSelectedEnvVars,
  displaySystemInfo
};