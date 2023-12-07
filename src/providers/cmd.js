import { getMainBattery as getBattery } from '@sbbw/api/bat'
import {
    isPlayerActive,
    getVolume,
    setVolume,
    getState,
    setNext,
    setPrev,
    setPlayPause,
} from '@sbbw/api/media'

const exec = ({ file, args }) => {
    return new Promise((resolve, reject) => {
        window.rpc
            .call(file, args)
            .then((data) => {
                if (typeof data === 'string') {
                    data = data.trim()
                    if (
                        !data.toLowerCase().trim().includes('invalid') ||
                        !data.toLowerCase().trim().includes('unsupported')
                    )
                        resolve(data)
                    else reject(data)
                } else {
                    if (data.code == 200) resolve(data.data)
                    else reject(data)
                }
            })
            .catch(reject)
    })
}

const setShutdownDevice = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./power.py', 'poweroff'],
        })
            .then(resolve)
            .catch(reject)
    })
}

const setRebootDevice = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./power.py', 'reboot'],
        })
            .then(resolve)
            .catch(reject)
    })
}

const setSuspendDevice = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./power.py', 'suspend'],
        })
            .then(resolve)
            .catch(reject)
    })
}

const setLookScreenDevice = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./power.py', 'look'],
        })
            .then(resolve)
            .catch(reject)
    })
}

export {
    getBattery,
    isPlayerActive,
    getVolume,
    setVolume,
    setNext,
    setPrev,
    setPlayPause,
    getState,
    setShutdownDevice,
    setRebootDevice,
    setSuspendDevice,
    setLookScreenDevice,
}
