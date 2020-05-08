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
    '/': 'index',
    '/library': 'index',
    '/nav-bar': 'nav-bar',
    '/footer': 'footer',
    '/book': 'book',
    '/books': 'books',
    '/add-book': 'add-book',
    '/account': 'account',
    '/registration': 'registration',
    '/admin/manage-accounts': 'manage-accounts',
    '/admin/manage-books': 'manage-books'
}
const getDataByPathFunctions = {
    '/book': (req) => getBookData(req),
    '/books': () => getBooksData(),
    '/accounts': () => getAccountsData()
}
const postDataFunctions = {
    '/add-book': (json) => saveBook(json),
    '/book/delete': (json) => deleteBook(json),
    '/registration': (json) => registerAccount(json),
    '/account/delete': (json) => deleteAccount(json)
}

const server = http.createServer((req, res) => {
    try {
        if (req.method === 'GET') doGET(req, res);
        else if (req.method === 'POST') doPOST(req, res);
        else {
            throw new Error('Unsupported method request')
        }
    } catch (e) {
        console.log('url: ' + req.url)
        console.log(e.message)
        console.log()

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
    if (getDataByPathFunctions.hasOwnProperty(subUrl)) {
        const dataStr = getDataByPathFunctions[subUrl.toString()](req, res);

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(dataStr);
    } else {
        throw new Error('GET method is NOT supported')
    }
}


mapContextPath = (url) => {
    return '/' + url.split('/')[1]
}
mapSubUrl = (url) => {
    let slashLastPosition = url.substr(1).indexOf('/')+1;
    let paramsStartPosition = url.substr(1).indexOf('?')+1;

    if (paramsStartPosition === 0) {
        return url.slice(slashLastPosition)
    } else {
        return url.substring(slashLastPosition, paramsStartPosition)
    }
}
mapUrlParams = (url) => {
    let paramsStartPosition = url.indexOf('?');

    let params = {};
    if (paramsStartPosition === -1) return params

    url.slice(paramsStartPosition+1)
        .split('&')
        .forEach(paramStr => {
            let param = paramStr.split('=');
            if (param.length !== 2) throw new Error('Incorrect url parameters with length: ' + param.length)

            params[param[0]] = param[1]
        })

    return params
}



/** GET methods with json response */
getBookData = (req) => {
    const storageStr = fs.readFileSync(booksDataPath).toString('utf-8');
    const storage = JSON.parse(storageStr)
    const id = mapUrlParams(req.url)['id']
    const result = storage.list.find(book => book.id == id);

    return JSON.stringify(result);
}
getBooksData = () => {
    return fs.readFileSync(booksDataPath).toString('utf-8')
}
getAccountsData = () => {
    return fs.readFileSync(accountsDataPath).toString('utf-8')
}


/** POST methods */
saveBook = (book) => {
    book.id = new Date().getTime()

    const booksStr = fs.readFileSync(booksDataPath).toString('utf-8');
    const books = JSON.parse(booksStr)

    books.list.push(book)
    fs.writeFileSync(booksDataPath, JSON.stringify(books))
}
registerAccount = (account) => {
    account.id = new Date().getTime()

    const accountsStr = fs.readFileSync(accountsDataPath).toString('utf-8')
    const accounts = JSON.parse(accountsStr)

    accounts.list.push(account)
    fs.writeFileSync(accountsDataPath, JSON.stringify(accounts))
}
deleteAccount = (json) => {
    const accountId = json.id;

    const accountsStr = fs.readFileSync(accountsDataPath).toString('utf-8');
    let accounts = JSON.parse(accountsStr)
    const foundAccount = accounts.list.find(account => account.id == accountId);
    const accountPositionIndex = accounts.list.indexOf(foundAccount);
    accounts.list.splice(accountPositionIndex, 1)

    fs.writeFileSync(accountsDataPath, JSON.stringify(accounts))
}
deleteBook = (json) => {
    const bookId = json.id

    const bookStr = fs.readFileSync(booksDataPath).toString('utf-8')
    let books = JSON.parse(bookStr)
    const foundBook = books.list.find(book => book.id == bookId)
    const bookPositionIndex = books.list.indexOf(foundBook)
    books.list.splice(bookPositionIndex, 1)

    fs.writeFileSync(booksDataPath, JSON.stringify(books))
}
