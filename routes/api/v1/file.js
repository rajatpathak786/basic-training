import multer from 'multer'
import router from '../../../server/router'
import FileController from '../../../app/controllers/file'
import { authenticate, isAuthenticated } from '../../../app/helpers/internalAuth'

const upload = multer({
  dest: 'upload/'
})

router.get('/file', authenticate, isAuthenticated, FileController.get)

export default router
