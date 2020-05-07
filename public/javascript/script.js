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
    get(url, (xhr) => fillPageWithBookCards(JSON.parse(xhr.response)))
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

    openBtn.href = `${contextPath}/book/` + book.id

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

    const url = `${contextPath}/add-book`;
    post(url, data, () => {
        location.replace(`${contextPath}/books`)
    })
}


// $(function() {
//     $('#email').on('focusout', () => validateEmail());
//     $('#pwd').on('focusout', () => validatePassword());
// });
//
//
// function validateEmail() {
//     let email = $("#email");
//     let isValid = true;
//
//     if (!email.val()) {
//         isValid = false;
//         email.addClass('is-invalid');
//         $("#email-error").html("Email is required")
//     } else if (!isEmailValid(email.val())) {
//         isValid = false;
//         email.addClass('is-invalid');
//         $("#email-error").html("Invalid email")
//     } else {
//         email.removeClass('is-invalid');
//         $("#email-error").html('');
//     }
//
//     return isValid;
// }
//
// function isEmailValid(email){
//     let re = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     return re.test(String(email).toLowerCase());
// }
//
// function validatePassword() {
//     let lengthOfPassword = 8;
//
//     let password = $("#pwd");
//     let isValid = true;
//
//     if (!password.val()) {
//         isValid = false;
//         password.addClass('is-invalid');
//         $("#pwd-error").html("Password is required");
//     } else if (password.val().length < lengthOfPassword) {
//         isValid = false;
//         password.addClass('is-invalid');
//         $("#pwd-error").html(`Password should be more than ${lengthOfPassword} symbols`);
//     } else {
//         password.removeClass('is-invalid');
//         $("#pwd-error").html('');
//     }
//
//     return isValid;
// }