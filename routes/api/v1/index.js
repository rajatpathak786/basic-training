import express from 'express'
import fileRoutes from './file'

const router = express.Router()
const NAMESPACE = '/v1'

router.use(NAMESPACE, fileRoutes)

export default router
