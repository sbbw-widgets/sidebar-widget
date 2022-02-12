const exec = ({ file, args }) => {
    return new Promise((resolve, reject) => {
        fetch("sbbw://exec", {
            mode: 'cors',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': window.location.origin,
            },
            method: 'POST',
            body: JSON.stringify({ file, args })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status == 200)
                    resolve(data.data)
                else
                    reject(data)
            })
            .catch(reject)
    });
}

const getBrightness = () => {
    return new Promise((resolve, reject) => {
        exec('brightnessctl', ['get'])
            .then(b =>
                resolve(parseInt(b.trim()))
            ).catch(reject)
    });
}

const getMaxBrightness = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'brightnessctl',
            args: ['max']
        }).then(b =>
            resolve(parseInt(b.trim()))
        ).catch(reject)
    });
}

const getVolume = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: './volume',
            args: ['get']
        }).then(b =>
            resolve(parseInt(b.trim()))
        ).catch(reject)
    });
}

const setBrightness = (brightness) => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'brightnessctl',
            args: ['set', brightness]
        })
            .then(resolve)
            .catch(reject)
    });
}

const setVolume = (volume) => {
    return new Promise((resolve, reject) => {
        exec({
            file: './volume',
            args: ['set', volume]
        })
            .then(resolve)
            .catch(reject)
    });
}

const getBattery = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./os_mod.py', 'bat', 'get']
        })
            .then(resolve)
            .catch(reject)
    });
}

const getBatteryStatus = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./os_mod.py', 'bat']
        })
            .then(resolve)
            .catch(reject)
    });
}

// Get name  of wifi network connected
const getNetworkSSID = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./os_mod.py', 'net', 'get']
        })
            .then(resolve)
            .catch(reject)
    });
}

const setShutdownDevice = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./power.py', 'poweroff']
        })
            .then(resolve)
            .catch(reject)
    });
}

const setRebootDevice = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./power.py', 'reboot']
        })
            .then(resolve)
            .catch(reject)
    });
}

const setSuspendDevice = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./power.py', 'suspend']
        })
            .then(resolve)
            .catch(reject)
    });
}

const setLookScreenDevice = () => {
    return new Promise((resolve, reject) => {
        exec({
            file: 'python',
            args: ['./power.py', 'look']
        })
            .then(resolve)
            .catch(reject)
    });
}

export {
    getVolume,
    getBrightness,
    getMaxBrightness,
    setBrightness,
    setVolume,
    getBattery,
    getBatteryStatus,
    getNetworkSSID,
    setShutdownDevice,
    setRebootDevice,
    setSuspendDevice,
    setLookScreenDevice,
}
