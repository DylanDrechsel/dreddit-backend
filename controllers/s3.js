import express from 'express';
import db from '../utils/generatePrisma.js';
import aws from 'aws-sdk'
import dotenv from 'dotenv'
import crypto, { randomBytes } from 'crypto'
const router = express.Router();

dotenv.config()

const region = 'us-east-2'
const bucketName = 'dreddit-images'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadUrl() {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)

    const objInfo = {
        url: uploadURL,
        key: params.Key
    }
    
    return objInfo
}
