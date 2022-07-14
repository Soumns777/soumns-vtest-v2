/**
 * 封装的请求api
 */

import soumnsHttp from '@/libs/http'

/**
 * 上传图片
 */

export const uploadImgs = (params) => {
  return soumnsHttp.post('/api/upload-images', params, {
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    }
  })
}
