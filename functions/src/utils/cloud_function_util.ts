import { runWith, RuntimeOptions, FunctionBuilder, Response } from 'firebase-functions'
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
const setResponseCors = (res: Response) => {
    //
    // Cors settigns
    //
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.set('Access-Control-Allow-Headers', '*');
}

//
//
//
export const CloudFunctionUtil = {
    createCloudFunction,
    setResponseCors,
}


