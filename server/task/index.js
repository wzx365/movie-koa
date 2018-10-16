const cp = require('child_process')
const { resolve } = require('path')

;(async () => {
    const script = resolve(__dirname, '../crawler/trailer-list.js')
    const child = cp.fork(script, [])

    // 是否已经调用过
    let invoked = false 

    child.on('error', err => {
        if (invoked) return 

        invoked = true 

        console.log(err)

    })

    child.on('exit', code => {
        if (invoked) return 

        invoked = false 

        let err = code === 0 ? null : new Error('exit code ' + code)

        console.log(err)
    })

    child.on('message', res => {
        let result = res.result
        console.log('------message-----')
        console.log(result)
    })

})()