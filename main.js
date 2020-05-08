let accounts = {
    name: 'accounts',
        list: [
    {
        username: 'writer',
        firstName: 'Dan',
        lastName: 'Brawn',
        email: 'dan.brown@gmail.com',
        password: 'iamwriter',
        passwordConfirm: 'iamwriter',
        id: 1588951201713
    },
    {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        id: 1588952465935
    }
]
}

const accountId = 1588951201713
const foundAccount = accounts.list.find(account => account.id == accountId);
const accountPositionIndex = accounts.list.indexOf(foundAccount);
accounts.list.splice(accountPositionIndex, 1)
console.log(accounts.list)
