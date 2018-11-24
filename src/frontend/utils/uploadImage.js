import axios from 'axios'

const upload = formData => (
  axios.post(`${process.env.BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
)

export default upload
