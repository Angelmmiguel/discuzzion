// Keys
import kbpgp from 'kbpgp';

// Constants from OpenPGP
const F = kbpgp['const'].openpgp;

const buildParams = (uuid, progress_hook) => {
  const asp = new kbpgp.ASP({ progress_hook });
  return {
    asp,
    userid: `${uuid}@discuzzion.com`,
    primary: {
      nbits: 1024,
      flags: F.certify_keys | F.sign_data | F.auth | F.encrypt_comm | F.encrypt_storage,
    },
    subkeys: []
  };
}

const generatePGPKeys = (uuid, hook) => {
  const opts = buildParams(uuid, hook);

  return new Promise((resolve, reject) => {
    kbpgp.KeyManager.generate(opts, (err, user) => {
      user.sign({}, (err) => {
        resolve(user);
      });
    });
  });
}

export default generatePGPKeys;
