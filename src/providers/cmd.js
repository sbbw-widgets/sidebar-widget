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

const getBrightness = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./brightness.py', 'get'],
        })
            .then(resolve)
            .catch(reject)
    })
}

const getVolume = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: './volume',
            args: ['get'],
        })
            .then(resolve)
            .catch(reject)
    })
}

const getMediaStatus = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./mediactl.py', 'status'],
        })
            .then(resolve)
            .catch(reject)
    })
}

const getMediaMetadata = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./mediactl.py', 'metadata'],
        })
            .then(resolve)
            .catch(reject)
    })
}

const setMedia = (cmd) => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./mediactl.py', cmd],
        })
            .then(resolve)
            .catch(reject)
    })
}

const setBrightness = (brightness) => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./brightness.py', 'set', `${brightness}`],
        })
            .then(resolve)
            .catch(reject)
    })
}

const setVolume = (volume) => {
    return new Promise((resolve, reject) => {
        exec({
            file: './volume',
            args: ['set', `${volume}`],
        })
            .then(resolve)
            .catch(reject)
    })
}

const getBattery = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./os_mod.py', 'bat', 'get'],
        })
            .then(resolve)
            .catch(reject)
    })
}

const getBatteryStatus = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./os_mod.py', 'bat'],
        })
            .then(resolve)
            .catch(reject)
    })
}

// Get name  of wifi network connected
const getNetworkSSID = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./os_mod.py', 'net', 'get'],
        })
            .then(resolve)
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
    getVolume,
    getBrightness,
    setBrightness,
    setVolume,
    getMediaStatus,
    getMediaMetadata,
    setMedia,
    getBattery,
    getBatteryStatus,
    getNetworkSSID,
    setShutdownDevice,
    setRebootDevice,
    setSuspendDevice,
    setLookScreenDevice,
}
