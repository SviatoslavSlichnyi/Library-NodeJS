const contextPath = '/library'
const contextApiPath = '/api.library'

document.addEventListener('DOMContentLoaded', () => {
    loadNavigationBar()
    loadFooter()
})


get = (url, success) => {
    let xhr = new XMLHttpRequest();
    //set up settings
    xhr.open("GET", url);

    //send request with data
    xhr.send();

    xhr.onload = () => {
        //success
        if (xhr.status === 200) success(xhr);
        //check error
        else {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    };

    xhr.onerror = () => {
        alert("request was not sent");
    }
}
post = (url, data, success) => {
    let xhr = new XMLHttpRequest();
    //set up settings
    xhr.open("POST", url);

    //send request with data
    xhr.send(JSON.stringify(data));

    xhr.onload = () => {
        //success
        if (xhr.status === 200) success(xhr);
        //check error
        else {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    };

    xhr.onerror = () => {
        alert("request was not sent");
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


loadNavigationBar = () => {
    let url = `${contextPath}/nav-bar`
    get(url, (xhr) => addNavigationBarToPage(xhr))
}
addNavigationBarToPage = (xhr) => {
    let navBarPlace = document.getElementById('navigation-bar-palace')
    navBarPlace.innerHTML = xhr.response
}

loadFooter = () => {
    let url = `${contextPath}/footer`
    get(url, (xhr) => addFooterToPage(xhr))
}
addFooterToPage = (xhr) => {
    let footerPlace = document.getElementById('footer-palace')
    footerPlace.innerHTML = xhr.response
}

loadBookCards = () => {
    const url = `${contextApiPath}/books`
    get(url, xhr => fillPageWithBookCards(JSON.parse(xhr.response)))
}
fillPageWithBookCards = (booksData) => {
    booksData.list.forEach(book => generateAndInsertBookCard(book))
}
generateAndInsertBookCard = (book) => {
    const booksPlace = document.getElementById('book-cards-place');

    let card = document.createElement('DIV');
        let img = document.createElement('IMG');
        let body = document.createElement('DIV');
            let title = document.createElement('H5');
            let subtitle = document.createElement('DIV');
                let author = document.createElement('A');
        let footer = document.createElement('DIV');
            let openBtn = document.createElement('A');

    if (book.hardcoverUrl !== '' && book.hardcoverUrl !== undefined) {
        img.src = book.hardcoverUrl
    } else {
        img.src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/book-icon.png"
    }
    title.innerText = book.name
    author.innerText = `${book.authorFirstName} ${book.authorLastName}`
    openBtn.href = `${contextPath}/book?id=` + book.id
    openBtn.innerText = 'Open'

    card.classList.add('card')
    card.classList.add('m-4')
    card.classList.add('d-inline-block')
    card.classList.add('bookcard-w')

    img.classList.add('card-img-top')
    img.classList.add('h-18')

    body.classList.add('card-body')

    title.classList.add('card-title')
    title.classList.add('m-0')

    subtitle.classList.add('meta')

    footer.classList.add('card-footer')
    footer.classList.add('p-2')

    openBtn.classList.add('btn')
    openBtn.classList.add('btn-primary')
    openBtn.classList.add('btn-sm')
    openBtn.classList.add('w-100')

    subtitle.appendChild(author)
    footer.appendChild(openBtn)

    body.appendChild(title)
    body.appendChild(subtitle)

    card.appendChild(img)
    card.appendChild(body)
    card.appendChild(footer)

    booksPlace.appendChild(card)
}

loadManageBookList = () => {
    const url = `${contextApiPath}/books`
    get(url, xhr => fillPageWithBookListItems(JSON.parse(xhr.response)))
}
fillPageWithBookListItems = (books) => {
    books.list.forEach(book => generateAndInsertBookListItem(book))
}
generateAndInsertBookListItem = (book) => {
    const bookListItemPlace = document.getElementById('m-books-place')

    let row = document.createElement('TR');
        let id = document.createElement('TH');
        let name = document.createElement('TD');
        let author = document.createElement('TD');
        let username = document.createElement('TD');
        let open = document.createElement('TD')
            let openRef = document.createElement('A');
        let del = document.createElement('TD');
            let deleteRef = document.createElement('A');

    id.innerText = book.id
    name.innerText = book.name
    author.innerText = `${book.authorFirstName} ${book.authorLastName}`
    openRef.innerText = 'Open'
    openRef.href = `${contextPath}/book?id=` + book.id
    deleteRef.innerText = 'Delete'
    // deleteRef.href = `${contextApiPath}/book/delete/` + book.id
    deleteRef.addEventListener('click', () => postDeleteBook(book))

    openRef.classList.add('btn')
    openRef.classList.add('btn-primary')
    openRef.classList.add('btn-sm')

    deleteRef.classList.add('btn')
    deleteRef.classList.add('btn-outline-danger')
    deleteRef.classList.add('btn-sm')

    open.appendChild(openRef)

    del.appendChild(deleteRef)

    row.appendChild(id)
    row.appendChild(name)
    row.appendChild(author)
    row.appendChild(username)
    row.appendChild(open)
    row.appendChild(del)

    bookListItemPlace.appendChild(row)
}

loadManageAccountsList = () => {
    const url = `${contextApiPath}/accounts`
    get(url, xhr => fillPageWithAccountsListItems(JSON.parse(xhr.response)))
}
fillPageWithAccountsListItems = (accounts) => {
    accounts.list.forEach(account => generateAndInsertAccountListItem(account))
}
generateAndInsertAccountListItem = (account) => {
    const accountListItemPlace = document.getElementById('m-account-place')

    let row = document.createElement('TR');
    let id = document.createElement('TH');
    let username = document.createElement('TD');
    let email = document.createElement('TD');
    let open = document.createElement('TD')
    let openRef = document.createElement('A');
    let del = document.createElement('TD');
    let deleteRef = document.createElement('A');

    id.innerText = account.id
    username.innerText = account.username
    email.innerText = account.email
    openRef.innerText = 'Open'
    openRef.href = `${contextPath}/account?id=` + account.id
    deleteRef.innerText = 'Delete'
    deleteRef.addEventListener('click', () => postDeleteAccount(account))

    openRef.classList.add('btn')
    openRef.classList.add('btn-primary')
    openRef.classList.add('btn-sm')

    deleteRef.classList.add('btn')
    deleteRef.classList.add('btn-outline-danger')
    deleteRef.classList.add('btn-sm')

    open.appendChild(openRef)

    del.appendChild(deleteRef)

    row.appendChild(id)
    row.appendChild(username)
    row.appendChild(email)
    row.appendChild(open)
    row.appendChild(del)

    accountListItemPlace.appendChild(row)
}

loadBookInfo = () => {
    const id = mapUrlParams(location.href)['id']
    const url = `${contextApiPath}/book?id=${id}`

    get(url, xhr => fillPageWithBookInfo(JSON.parse(xhr.response)))
}
fillPageWithBookInfo = (book) => {
    console.log('book: ' + JSON.stringify(book))

    document.getElementById('title').innerText = book.name;
    document.getElementById('first-name').innerText = book.authorFirstName;
    document.getElementById('last-name').innerText = book.authorLastName;
    let hardcoverImg = document.getElementById('hardcover-img');
    if (book.hardcoverUrl !== '') {
        hardcoverImg.src = book.hardcoverUrl;
    }
    document.getElementById('book-file-url').href = book.bookFileUrl;

    document.getElementById('publisher').innerText = book.publisher;
    document.getElementById('publication-year').innerText = book.publicationYear;
    document.getElementById('pages').innerText = book.numberOfPages;
    document.getElementById('language').innerText = book.language;
    document.getElementById('description').innerText = book.description;
}

loadAccountInfo = () => {
    const id = mapUrlParams(location.href)['id']
    const url = `${contextApiPath}/account?id=${id}`

    get(url, xhr => fillPageWithAccountInfo(JSON.parse(xhr.response)))
}
fillPageWithAccountInfo = (account) => {
    document.getElementById('username').innerText = account.username
    document.getElementById('first-name').innerText = account.authorFirstName
    document.getElementById('last-name').innerText = account.authorLastName
    document.getElementById('email').innerText = account.email
}


addBook = (e) => {
    e.preventDefault()
    let hardcoverUrl = document.getElementById('hardcover').value
    let name = document.getElementById('name').value
    let authorFirstName = document.getElementById('author-first-name').value
    let authorLastName = document.getElementById('author-last-name').value
    let publisher = document.getElementById('publisher').value
    let publicationYear = document.getElementById('publication-year').value
    let numberOfPages = document.getElementById('number-of-pages').value
    let language = document.getElementById('language').value
    let description = document.getElementById('description').value
    let bookFileUrl = document.getElementById('book-file').value

    let data = {
        hardcoverUrl: hardcoverUrl,
        name: name,
        authorFirstName: authorFirstName,
        authorLastName: authorLastName,
        publisher: publisher,
        publicationYear: publicationYear,
        numberOfPages: numberOfPages,
        language: language,
        description: description,
        bookFileUrl: bookFileUrl
    }

    if (!isBookDataValid(data)) {
        alert('Error: Some fields are not filled.')
        return
    }

    const url = `${contextPath}/add-book`;
    post(url, data, () => {
        location.replace(`${contextPath}/books`)
    })
}
registerAccount = (e) => {
    e.preventDefault()

    let username = document.getElementById('username').value;
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let passwordConfirm = document.getElementById('passwordConfirm').value;

    let data = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    }

    if (!isAccountDataValid(data)) {
        return
    }

    const url = `${contextPath}/registration`
    post(url, data, () => {
        alert('Account was successfully registered.')
        location.replace(`${contextPath}`)
    })
}
postDeleteAccount = (account) => {
    const url = `${contextApiPath}/account/delete`
    post(url, {id: account.id}, () => {
        alert(`"${account.username}"'s account was successfully deleted.`)
        location.reload()
    })
}
postDeleteBook = (book) => {
    const url = `${contextApiPath}/book/delete`
    post(url, {id: book.id}, () => {
        alert(`"${book.name}" book was successfully deleted.`)
        location.reload()
    })
}

isBookDataValid = (bookData) => {
    for (const property in bookData) {
        console.log(`${property}: ${bookData[property]}`)
        if (bookData[property] === '' || bookData[property] === undefined) {
            return false;
        }
    }

    return true;
}
isAccountDataValid = (accountData) => {
    for (const property in accountData) {
        console.log(`${property}: ${accountData[property]}`)
        if (accountData[property] === '' || accountData[property] === undefined) {
            alert('Some of fields are empty.')
            return false;
        }
    }

    const password = accountData['password'];
    const passwordConfirm = accountData['passwordConfirm']
    if (password !== passwordConfirm) {
        alert(`Confirm password doesn't match with password`)
        return false
    }

    const email = accountData['email'];
    if (!validateEmail(email)) {
        alert('Incorrect email.')
        return false
    }

    return true;
}
validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}