import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Uploads an event asset to Cloudinary
 * @param fileBuffer Raw file buffer
 * @param folder Cloudinary folder to upload to
 * @returns Promise resolving to secure URL of uploaded asset
 */
export async function uploadEventAsset(
  fileBuffer: Buffer,
  folder: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve(result.secure_url)
        } else {
          reject(new Error('No result from Cloudinary upload'))
        }
      }
    )
    Readable.from(fileBuffer).pipe(uploadStream)
  })
}
