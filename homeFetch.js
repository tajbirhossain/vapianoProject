const tableName = document.querySelector('#table-name-select')
const selectedTable = JSON.parse(localStorage.getItem('user'))
const sliderItem1 = document.getElementById('sliderItem1')
const sliderItem2 = document.getElementById('sliderItem2')
const sliderItem3 = document.getElementById('sliderItem3')
const sliderItem4 = document.getElementById('sliderItem4')
const sliderItem5 = document.getElementById('sliderItem5')
const sliderItem6 = document.getElementById('sliderItem6')
const sliderItem7 = document.getElementById('sliderItem7')
const sliderItem8 = document.getElementById('sliderItem8')
const sliderItem9 = document.getElementById('sliderItem9')
const sliderItem10 = document.getElementById('sliderItem10')
const sliderItem11 = document.getElementById('sliderItem11')
const sliderItem12 = document.getElementById('sliderItem12')
const sliderItem13 = document.getElementById('sliderItem13')
const sliderItem14 = document.getElementById('sliderItem14')
const btncart = document.querySelector("#btncart")
const modalimg = document.querySelector("#modalImg")
const modalimg1 = document.querySelector("#modalImg1")
const mdltitle = document.querySelector("#mdltitle")
const catCon = document.querySelector(".catCon")
const prCon = document.querySelector('.prCon')
const counter = document.getElementById('counter')
const btndec = document.querySelector("#btndec")
const btninc = document.querySelector("#btninc")


tableName.innerHTML = selectedTable?.username ? selectedTable.username : 'Not joined/ created a table'


try {
    fetch("https://vapianotest1.herokuapp.com/api/")
        .then(response => response.json())
        .then(json => {
            let singleItemHolder = ''
            json.forEach((element, index) => {
                singleItemHolder += `
                <div class="slideWraper" id=${element._id} onclick='getInfo(this.id)'>
                <div class="itemWrapper">

                <a href="#orderModal" data-bs-toggle="modal">
                
                    <h1>${element.title}</h1>
                
                    <img src=${'https://vapianotest1.herokuapp.com/' + element.image} class="img-fluid">
                
                    <div class="item_btm">
                
                        <div class="item_info" data-bs-toggle="modal" data-bs-target="#allergens">
                
                            <i class="bi bi-info-circle"></i>
                
                        </div>
                
                        <div class="item_price">€ ${element.price}</div>
                
                    </div>
                
                </a>    
                </div>
                
                </div>
                
                
                `
            });
            sliderItem1.innerHTML = singleItemHolder
            console.log(json);
        });
} catch (error) {
    console.log(error);
}

let initialquantity = 1
function getInfo(get) {
    try {
        fetch('https://vapianotest1.herokuapp.com/api/loadSingle', {
            method: 'POST',
            body: JSON.stringify({
                id: get
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                modalimg1.setAttribute('src', `https://vapianotest1.herokuapp.com/${json.image}`),
                    mdltitle.innerHTML = json.title,
                    catCon.innerHTML = json.category,
                    prCon.innerHTML = json.price
                counter.value = initialquantity
            });
    } catch (error) {
        console.log(err);
    }
}

btninc.addEventListener('click', () => {
    const finVal = ++initialquantity
    counter.value = finVal
    console.log(initialquantity);
})
btndec.addEventListener('click', () => {
    const finVal = counter.value > 1 ? --initialquantity : 1
    counter.value = finVal
})




btncart.addEventListener('click', () => {
    if (selectedTable?.username) {
        try {
            fetch('https://vapianotest1.herokuapp.com/api/order', {
                method: 'POST',
                body: JSON.stringify({
                    username: selectedTable.username,
                    title: mdltitle.innerHTML,
                    category: catCon.innerHTML,
                    quantity: initialquantity,
                    price: prCon.innerHTML
                }),
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log(json);
                    window.location = '/order.html'
                });
        } catch (error) {
            console.log(error);
        }
    } else {
        window.alert('Join or create a table first')
    }
})








