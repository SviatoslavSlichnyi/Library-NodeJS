const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 8080
const contextPath = '/library'
const contextApiPath = '/api.library'
const pagesDir = __dirname + '/public'
const booksDataPath = path.join(__dirname, 'storage', 'books.json')
const accountsDataPath = path.join(__dirname, 'storage', 'accounts.json')

const registerPathWithPage = {
    '': 'index',
    '/': 'index',
    '/nav-bar': 'nav-bar',
    '/footer': 'footer',
    '/books': 'books',
    '/add-book': 'add-book'
}

const getDataByPathFunctions = {
    '/books': () => getBooksData()
}

const postDataFunctions = {
    '/add-book': (json) => saveBook(json),
}

const server = http.createServer((req, res) => {
    try {
        if (req.method === 'GET') doGET(req, res);
        else if (req.method === 'POST') doPOST(req, res);
        else {
            throw new Error('Unsupported method request')
        }
    } catch (e) {
        console.log(e.message)
        res.writeHead(500)
        res.end('Something went wrong.Please, contact with ADMIN.')
    }
})
server.listen(port, () => {
    console.log(`Server has been started on port: ${port}...`)
    console.log(`Go to localhost:${port}${contextPath} in order to open website.`)
    console.log(`---------------------------------------------------------------`)
    console.log()
})


doGET = (req, res) => {
    const context = mapContextPath(req.url)

    if (context === contextPath) getPage(req, res)
    else if (context === contextApiPath) getData(req, res)
}
doPOST = (req, res) => {
    let data = []
    req.on('data', chunk => { data.push(chunk) })

    const subUrl = mapSubUrl(req.url)
    if (postDataFunctions.hasOwnProperty(subUrl)) {
        req.on('end', () => {
            const json = JSON.parse(data.toString())
            postDataFunctions[subUrl.toString()](json)
        })
    } else {
        throw new Error('Post method is NOT supported')
    }

    res.writeHead(200)
    res.end()
}

getPage = (req, res) => {
    let page;
    const pageUrl = mapSubUrl(req.url)

    const pathExtname = path.extname(pageUrl);
    if (pathExtname === '') {
        const pageName = registerPathWithPage[pageUrl.toString()];
        const pagePath = path.join(pagesDir, `${pageName}.html`)

        try {
            page = fs.readFileSync(pagePath);
        } catch (e) { throw e }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
    }
    else if (pathExtname === '.css') {
        const fileName = path.basename(req.url)
        const fileNamePath = path.join(pagesDir, 'style', `${fileName}`)
        try {
            page = fs.readFileSync(fileNamePath);
        } catch (e) { throw e }

        res.writeHead(200, {
            'Content-Type': 'text/css'
        })
    }
    else if (pathExtname === '.js') {
        const fileName = path.basename(req.url)
        const pageFileName = path.join(pagesDir, 'javascript', `${fileName}`)
        try {
            page = fs.readFileSync(pageFileName);
        } catch (e) { throw e }

        res.writeHead(200, {
            'Content-Type': 'text/javascript'
        })
    }
    else {
        throw new Error(`Unsupported GET request`)
    }
    res.end(page.toString('utf-8'))
}
getData = (req, res) => {

    const subUrl = mapSubUrl(req.url)
    if (postDataFunctions.hasOwnProperty(subUrl)) {
        const dataStr = postDataFunctions[subUrl.toString()]();

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(dataStr);
    } else {
        throw new Error('Post method is NOT supported')
    }

}

getBooksData = () => {
    return fs.readFileSync(booksDataPath).toString('utf-8')
}

mapContextPath = (url) => {
    return '/' + url.split('/')[1]
}
mapSubUrl = (url) => {
    let slashLastPosition = url.lastIndexOf('/');
    return url.substr(slashLastPosition, url.length)
}

saveBook = (book) => {
    console.log('saving a book...')

    book.id = new Date().getTime()
    console.log(book)

    const booksStr = fs.readFileSync(booksDataPath).toString('utf-8');
    const books = JSON.parse(booksStr)

    books.list.push(book)
    fs.writeFileSync(booksDataPath, JSON.stringify(books))
}

