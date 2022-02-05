const sortable = document.getElementById('sortable1')
const tableNameSelected = document.getElementById('table-name-select')
const btnplace = document.getElementById("btnplace")
const selectedTable = JSON.parse(localStorage.getItem('user'))
tableNameSelected.innerHTML = selectedTable?.username ? selectedTable.username : 'Not joined/ created a table'
username = selectedTable?.username ? selectedTable.username : 'prop man 2'


try {
    fetch('https://vapianotest1.herokuapp.com/api/order/getItems', {
        method: 'POST',
        body: JSON.stringify({
            username: username
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            let sortItems = ''
            localStorage.setItem('allCart', JSON.stringify(json))
            json.forEach((element, index) => {
                sortItems += `
                <div class="orderlist ">

                    <div class="billstyle">${element.quantity}</div>

                    <div class="billstyle">${element.title}</div>

                    <div class="billstyle">13.50€</div>

                    <div class="billstyle caretupdown">

                        <span>&#9650;</span>

                        <span>&#9660;</span>

                    </div>

                </div>
                `
            });
            sortable.innerHTML = sortItems
        });
} catch (error) {
    console.log(error);
}


btnplace.addEventListener('click', () => {
    const username = JSON.parse(localStorage.getItem('allCart')).username
    const title = JSON.parse(localStorage.getItem('allCart')).title
    const category = JSON.parse(localStorage.getItem('allCart')).category
    const quantity = JSON.parse(localStorage.getItem('allCart')).quantity
    const price = JSON.parse(localStorage.getItem('allCart')).price
    console.log(JSON.parse(localStorage.getItem('allCart')).username);
    try {
        fetch('https://vapianotest1.herokuapp.com/api/order/', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                title: title,
                category: category,
                quantity: quantity,
                price: price
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }
})
