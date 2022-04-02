import { runWith, RuntimeOptions, FunctionBuilder } from 'firebase-functions'

//
//
//
const createCloudFunction = (
    runtimeOption: RuntimeOptions = {
        // Unit in seconds
        timeoutSeconds: 60,

        memory: '128MB',
    },
    region = "australia-southeast1"
): FunctionBuilder => runWith(runtimeOption).region(region)

//
//
//
export const CloudFunctionUtil = {
    createCloudFunction
}
