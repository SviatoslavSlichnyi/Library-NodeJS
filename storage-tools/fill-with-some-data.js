const fs = require('fs')
const path = require('path')

const books = {
    name: 'books',
    list: [
        {
            hardcoverUrl: 'https://upload.wikimedia.org/wikipedia/uk/a/ab/%D0%94%D0%B5%D0%BD_%D0%91%D1%80%D0%B0%D1%83%D0%BD%2C_%C2%AB%D0%86%D0%BD%D1%84%D0%B5%D1%80%D0%BD%D0%BE%C2%BB.jpg',
            name: 'Inferno',
            authorFirstName: 'Dan',
            authorLastName: 'Brawn',
            publisher: 'Book-Ye',
            publicationYear: '2016',
            numberOfPages: '606',
            language: 'English',
            description: 'Cool book.',
            bookFileUrl: 'http\\\\dropbox....',
            id: 1588967482751
        },
        {
            hardcoverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG%2BL.jpg',
            name: 'Clean Code',
            authorFirstName: 'Steve',
            authorLastName: 'Jobs',
            publisher: 'Yakaboo',
            publicationYear: '2000',
            numberOfPages: '471',
            language: 'Ukraine',
            description: 'Be better programmer.',
            bookFileUrl: 'http\\\\dropbox....',
            id: 1588967632042
        }
    ]
}
const accounts = {
    name: 'accounts',
    list: [
        {
            username: 'writer',
            firstName: 'Dan',
            lastName: 'Brawn',
            email: 'dan.brown@gmail.com',
            password: 'iamwriter',
            passwordConfirm: 'iamwriter',
            id: 1588966707800
        },
        {
            username: 'apple',
            firstName: 'Steve',
            lastName: 'Jobs',
            email: 'steve.jobs@gmail.com',
            password: 'iloveapples',
            passwordConfirm: 'iloveapples',
            id: 1588967730560
        }
    ]
}

let filePath;
const folderPath = path.join(__dirname, '..', 'storage')

const booksFileName = 'books.json'
filePath = path.join(folderPath, booksFileName);
fs.writeFileSync(filePath, JSON.stringify(books))
console.log(`File "${booksFileName}" was filled.`)

const accountsFileName = 'accounts.json'
filePath = path.join(folderPath, accountsFileName)
fs.writeFileSync(filePath, JSON.stringify(accounts))
console.log(`File "${accountsFileName}" was filled.`)
