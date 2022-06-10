import { FirebaseApp, initializeApp } from 'firebase/app'
import {
    getFirestore, connectFirestoreEmulator,
    collection,
    query,
    where,
    orderBy,
    doc,
    onSnapshot,
    onSnapshotsInSync,
} from 'firebase/firestore'
import { BrowserUtil } from './browser_util'
import { LogUtil, LogTheme } from './log_util'
import { TodoItem } from '../types/types'
import { TodoListStateService } from '../states/todoList-state-service'

const LOG_NAME = `FirebaseClientUtil`

const firebaseConfig = {
    apiKey: "AIzaSyAgJbd8eDIXVkmnMb2UzKfRR0efpfvN56Y",
    authDomain: "todolist-3f2c7.firebaseapp.com",
    databaseURL: "https://todolist-3f2c7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todolist-3f2c7",
    storageBucket: "todolist-3f2c7.appspot.com",
    messagingSenderId: "320842311013",
    appId: "1:320842311013:web:386eee3b4c6a17f0832d8c",
    measurementId: "G-BK91EN6R7G"
}

let alreadyInitFirebase = false
// let alreadyInitFunctions = false
let alreadyInitFirestore = false
let defaultFirebaseApp: FirebaseApp | null = null


//
//
//
const getDefaultApp = (): FirebaseApp => {
    /**
     * Init firebase app when needed
     */
    if (defaultFirebaseApp === null) {
        if (BrowserUtil.isBrowser()) {
            LogUtil.debug(
                LOG_NAME,
                `global-init`,
                `init firebase client.`,
                LogTheme.IMPORTANT,
            )

            if (!alreadyInitFirebase) {
                defaultFirebaseApp = initializeApp(firebaseConfig)
                alreadyInitFirebase = true
            }

            // (window as any).firebase = firebaseClient;
        }
    }

    return defaultFirebaseApp as FirebaseApp
}

//
// Subscribe to `/todolist`
//
const queryToDoList = async (): Promise<() => void> => {
    const db = BrowserUtil.isLocalHost()
        ? FirebaseClientUtil.firestoreEmulator()
        : FirebaseClientUtil.firestore()
// /todolist/RdRhp6ykIVPLKotolewq
    const todoListCollectionPath = `todolist`
    LogUtil.debug(
        LOG_NAME,
        `queryToDoList`,
        `todoListCollectionPath: ${todoListCollectionPath}`,
        LogTheme.TESTING,
    )

    const q = query(
        collection(db, todoListCollectionPath),
        // where('state', 'in', ['Pending', 'Running']),
        // orderBy('startTime'),
    )

    // return onSnapshot(doc(db, `/todolist/NyrS72LQzDRcyVYigmH5`), (doc)=> {
    //     console.log(`doc data: `, doc.data())
    // })

    return onSnapshot(
        q,
        (snapshot) => {
            const items = new Array<TodoItem>()
            snapshot.forEach((doc) => {
                const data = doc.data() as TodoItem

                items.push({
                    docId: doc.id,
                    id: ``,
                    // id: data.itemId && data.itemId.trim() !== '' ? doc.itemId : ``,
                    text: data.text,
                    isFinished: data.isFinished,
                    alarmTime: data.alarmTime && data.alarmTime.trim() !== '' ? data.alarmTime : ``
                })
            })

            LogUtil.debug(
                LOG_NAME,
                `queryToDoList`,
                `items: ${JSON.stringify(items, null, 4)}`,
                LogTheme.TESTING,
            )

            TodoListStateService.reload(items)
        },
        (firestoreError) => {
            // toast('Failed to get auctions', { type: 'error' })
            LogUtil.debug(
                LOG_NAME,
                `queryToDoList`,
                `firestoreError: ${JSON.stringify(firestoreError, null, 4)}`,
                LogTheme.ERROR,
            )
        },
        () => {
            LogUtil.debug(
                LOG_NAME,
                `queryToDoList`,
                `onComplete`,
                LogTheme.TESTING,
            )
        },
    )
}

//
//
//
export const FirebaseClientUtil = {
    // functions: () => getFunctions(getDefaultApp(), `australia-southeast1`),
    // functionsEmulator: () => {
    //     LogUtil.debug(
    //         `FirebaseClientUtil`,
    //         `functionsEmulator`,
    //         `Use firebase emulator on 5001`,
    //         LogTheme.IMPORTANT,
    //     )
    //     const functionsRef = getFunctions(
    //         getDefaultApp(),
    //         `australia-southeast1`,
    //     )
    //     if (!alreadyInitFunctions) {
    //         connectFunctionsEmulator(functionsRef, 'localhost', 5001)
    //         alreadyInitFunctions = true
    //     }
    //     return functionsRef
    // },
    init: () => getDefaultApp(),
    firestore: () => getFirestore(getDefaultApp()),
    firestoreEmulator: () => {
        LogUtil.debug(
            `FirebaseClientUtil`,
            `firestoreEmulator`,
            `Use firebase emulator 8080`,
            LogTheme.IMPORTANT,
        )
        const firestoreRef = getFirestore(getDefaultApp())
        if (!alreadyInitFirestore) {
            connectFirestoreEmulator(firestoreRef, 'localhost', 8080)
            alreadyInitFirestore = true
        }
        return firestoreRef
    },
    queryToDoList,
}

