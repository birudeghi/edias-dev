import SerialPort from 'avrgirl-arduino/lib/browser-serialport';

export const newSerial = (baud) => {
    return new SerialPort({
        baudRate: baud
    });
}

export const openSerial = (port) => {
    return new Promise((resolve, reject) => {
        port.open(function (error) {
            if (error) {
                console.log("Failed to open: " + error);
                reject("Failed to open: " + error);
            } else {
                console.log("Port open.")
                resolve(true);
            }
        });
    })
}

export const closeSerial = (port) => {
    if (port.isOpen) {
        port.close(function (error) {
            if (error) {
                console.log("Failed to close: " + error)
                return false;
            } else {
                if (!port.isOpen) {
                    return true;
                }
            }
        })
    }
}

// const readBuff = (port) => {
//     return new Promise((resolve, reject) => port.read((buff, err) => {
//       if (err) reject(err);
//       else resolve();
//     }));
//   }

// export async function read(port, size) {
//     const buff = await readBuff(port);
//     return buff && buff.slice(0, Math.min(buff.length, size || Infinity));
// }

// const writeBuff = (port, buff) => {
//     // eslint-disable-next-line no-console
//     console.log('write', buff.toString('hex'));
//     return new Promise((resolve, reject) => port.write(buff, (err) => {
//       if (err) reject(err);
//       else resolve();
//     }));
//   }

// export async function write(port, message, encoding = null, cb = () => {}) {
// if (typeof encoding === 'function') {
//     // eslint-disable-next-line no-param-reassign
//     cb = encoding;
//     // eslint-disable-next-line no-param-reassign
//     encoding = null;
// }
// if (typeof message === 'string') return;
// try {
//     await writeBuff(port, typeof message === 'string' ? Buffer.from(message, encoding) : message);
// } catch (err) {
//     cb?.(err);
//     return;
// }
// cb?.();
// }
//insert eventemitter.on('data') here to allow reading serial data to xterm