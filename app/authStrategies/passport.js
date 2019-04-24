import passport from 'passport'
import config from '../../config/app'
import bcrypt from 'bcrypt'
import Log from '../../server/logger'
import { BasicStrategy } from 'passport-http'

const registerInternalAuthStrategy = () => {
  passport.use('internal', new BasicStrategy(
    async function (username, password, done) {
      if (username !== config.get('ptoy_storage_management_service_client_id')) { return done(null, false) }
      const result = await bcrypt.compare(password, config.get('ptoy_storage_management_service_client_secret'))
      if (!result) { return done(null, false) }
      Log.info('Request received from CORE service')
      return done(null, true)
    }
  ))
}

export default registerInternalAuthStrategy
