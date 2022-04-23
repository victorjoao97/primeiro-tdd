import nodeHtmlToImage from "node-html-to-image"
import fs from 'fs'

fs.readFile('./coverage/lcov-report/src/index.html', (err, data) => {
    if (err) throw err

    nodeHtmlToImage({
        output: './dist/coverage.png',
        html: data.toString()
    })
    .then(() => console.log('The image was created successfully!'))
})
