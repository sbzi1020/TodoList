import { CloudFunctionUtil } from './utils/cloud_function_util'
import { Request, Response } from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

//
const isEmptyAttr = (attr: any): boolean => {
    return Boolean(
        attr === undefined ||
        attr === null ||
        typeof attr === 'string' && attr.trim() === '' ||
        typeof attr === 'number' && attr <= 0
    )
}

//
interface HttpResult {
    success: boolean
    error?: any
    data?: any
}

//
// Export HTTP triggered cloud function, it generates a URL for client to send
// HTTP request
//
export const addToDoItem = CloudFunctionUtil
    .createCloudFunction()
    .https
    .onRequest(async (req: Request, res: Response) => {
        // .onCall(async (reqBody: any, context) => {
        // functions.logger.debug(`reqBody: ${JSON.stringify(req.body, null, 4)}`)

        CloudFunctionUtil.setResponseCors(res)

        //
        // Print the reqeust info
        //
        console.log(`>>> request type: ${req.method}`)
        console.log(`>>> request path: ${req.path}`)
        console.log(`>>> request query: ${JSON.stringify(req.query, null, 4)}`)
        if (req.method === "POST") {
            console.log(`>>> request body: ${JSON.stringify(req.body, null, 4)}`)
        }

        // End connection immediately if not `POST`
        if (req.method !== 'POST') {
            console.log(`>>> Close connection because is NOT POST.`)
            res.end();
            return;
        }

        const result: HttpResult = ({
            success: false
        })

        //
        // Check post body
        //
        if (isEmptyAttr(req.body.text)) {
            result.error = `Invalid to do item.`
            res.status(400).json(result)
        } else {
            //
            // Save to DB
            //

            // Get back firestore instance
            const db = admin.firestore()

            // Get back collection reference
            const collectionRef = db.collection(`/todolist`)

            // Create new doc
            const newItemDoc = collectionRef.doc()
            try {
                // Set doc data
                await newItemDoc.set({
                    id: newItemDoc.id,
                    text: req.body.text,
                    isFinished: req.body.isFinished
                })

                result.success = true
                result.data = newItemDoc.id
                res.status(200).json(result)
            }
            catch (error: any) {
                result.success = false
                result.error = error.message ? error.message : `Fail to add new item`
                res.status(500).json(result)
            }
        }
    })

//
//
//
export const updateToDoItem = CloudFunctionUtil
    .createCloudFunction()
    .https
    .onRequest(async (req: Request, res: Response) => {
        CloudFunctionUtil.setResponseCors(res)

        //
        // Print the reqeust info
        //
        console.log(`>>> request type: ${req.method}`)
        console.log(`>>> request path: ${req.path}`)
        console.log(`>>> request query: ${JSON.stringify(req.query, null, 4)}`)
        if (req.method === "POST") {
            console.log(`>>> request body: ${JSON.stringify(req.body, null, 4)}`)
        }

        // End connection immediately if not `POST`
        if (req.method !== 'POST') {
            console.log(`>>> Close connection because is NOT POST.`)
            res.end();
            return;
        }

        const result: HttpResult = ({
            success: false
        })

        //
        // Check post body
        //
        if (isEmptyAttr(req.body.docId) ||
            isEmptyAttr(req.body.isFinished) ||
            isEmptyAttr(req.body.text)) {
            result.error = `Invalid update to do item.`
            res.status(400).json(result)
        } else {
            // Get back firestore instance
            const db = admin.firestore()

            // Get back collection reference
            // `/col/doc/col/doc`
            const docRef = db.doc(`/todolist/${req.body.docId}`)

            // Updateg doc
            try {
                await docRef.update({
                    text: req.body.text,
                    isFinished: req.body.isFinished,
                    alarmTime: req.body.alarmTime,
                })

                result.success = true
                res.status(200).json(result)
            }
            catch (error: any) {
                result.success = false
                result.error = error.message ? error.message : `Fail to update new item`
                res.status(500).json(result)
            }
        }
    })
