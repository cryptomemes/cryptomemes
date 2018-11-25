import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.load()

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'ap-southeast-1'
})

const s3 = new aws.S3()

const generateId = () => {
    return crypto.randomBytes(16).toString('hex')
}

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'crypto-memes',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, generateId())
      }
    })
  })
  

 export default upload