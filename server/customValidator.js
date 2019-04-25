import validate from 'validate.js'
import config from '../config/app'
import crypto from 'crypto'

var validators = {}

validators.verifyRSASignature = (value, options, key, attributes) => {
  try {
    const verifier = crypto.createVerify('SHA256')
    verifier.update(attributes.walletAddress)
    if (!verifier.verify(Buffer.from(attributes.rsaPubKey, 'hex').toString(), value, 'hex')) return 'invalid'
  } catch (error) {
    return error.message
  }
}

if (!/Core Service|Patientory File Server/.test(config.get('app.name'))) {
  const getWeb3Instance = require('../lib/web3').default
  const web3 = getWeb3Instance('hospital')
  validators.isAddress = (value, options, key, attributes) => {
    if (!web3.isAddress(value)) {
      return 'Invalid Address'
    }
  }
}

Object.assign(validate.validators, validators)

export default validate
