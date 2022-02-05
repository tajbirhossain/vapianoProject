const tablePerson = document.getElementById("table-person")
const joinForm = document.getElementsByClassName('joinForm')[0]
const createForm = document.getElementsByClassName('createForm')[0]
const vapianoTableJoin = document.getElementById('vapiano-table-join')
const vapianoTableCreate = document.getElementById("vapiano-table-create")
const fillForm1 = document.getElementsByClassName('fill-form1')[0]
const fillForm2 = document.getElementsByClassName('fill-form2')[0]



joinForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (vapianoTableJoin.value) {
        fetch('https://vapianotest1.herokuapp.com/api/createUser', {
            method: 'post',
            body: JSON.stringify({
                username: vapianoTableJoin.value
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                localStorage.setItem('user', JSON.stringify(json));
                window.location = '/home.html'
            });
    } else {
        fillForm1.classList.add('active')
    }
})
createForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if (vapianoTableCreate.value) {
        fetch('https://vapianotest1.herokuapp.com/api/createUser', {
            method: 'POST',
            body: JSON.stringify({
                username: vapianoTableCreate.value
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                localStorage.setItem('user', JSON.stringify(json));
                window.location = '/home.html'
            });
    } else {
        fillForm2.classList.add('active')
    }
})

