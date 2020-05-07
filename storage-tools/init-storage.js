const fs = require('fs')
const path = require('path')

let filePath;
const folderPath = path.join(__dirname, '..', 'storage')

//Create folder
fs.mkdir(folderPath, err => {
    if (err) throw err

    console.log('Directory \"storage\" was created.')
})

const booksFileName = 'books.json'
filePath = path.join(folderPath, booksFileName);
const books = {
    name: "books",
    list: []
}
fs.writeFileSync(filePath, JSON.stringify(books))
console.log(`File "${booksFileName}" was created.`)

const accountsFileName = 'accounts.json'
filePath = path.join(folderPath, accountsFileName)
const accounts = {
    name: "accounts",
    list: []
}
fs.writeFileSync(filePath, JSON.stringify(accounts))
console.log(`File "${accountsFileName}" was created.`)