let data = JSON.parse(localStorage.getItem('productInfo'));
const IMG = new Image();
let productObjects = [];
let counter = 0;
let productQuantity = document.getElementById('productQuantity');

if (localStorage.getItem('ecommerce')) {
    productObjects = JSON.parse(localStorage.getItem('ecommerce'));
    productObjects.forEach(product => {
        if (product.productId == data.ProductId) {
            counter += Number(product.counter);
        }
    });
}

IMG.src = data.ProductPicUrl;
IMG.classList.add('image-fluid');
document.getElementById('img').appendChild(IMG)
document.getElementById('desc').innerHTML = data.Description;
document.getElementById('category').innerHTML = data.Category;
document.getElementById('name').innerHTML = data.productName;
let quantity = document.getElementById('quantity').querySelector('input');
if(getProductInfoCounter(data.ProductId) == data.quantity){
    quantity.value = +counter; 
}else{
    quantity.value = +counter+1;
}
document.getElementById('price').querySelector('h1').innerHTML = '$' + data.Price;
document.getElementById('available').innerHTML = 'Availablilty: ' + data.Status;
quantity.addEventListener('input',function(){
    this.setAttribute('min','1');
    this.setAttribute('max',data.quantity);
     if(Number(this.value) >Number(data.quantity)){
        quantity.value = data.quantity;
                document.getElementById('quantityError').innerHTML = 'This Product Has Only '+data.quantity+' Available In The Stock';
    }else if (this.value == 0){
        quantity.value = 1;
    }
});


document.getElementById('productAdd').addEventListener('click', function () {
    let choosenProducts = JSON.parse(localStorage.getItem('ecommerce'));
    let newlyProductAdded = {};
    if (choosenProducts) {
        let productChosed = 0;
        choosenProducts.forEach(product => {
            if (product.productId == data.ProductId) {
                productChosed = product;
            }
        });
        if (productChosed != 0) {
            if(productChosed.counter < productChosed.quantity){
            if (productChosed.counter < quantity.value) {
                choosenProducts[choosenProducts.indexOf(productChosed)].totalPrice = choosenProducts[choosenProducts.indexOf(productChosed)].totalPrice + Number(Number(data.Price) * (Number(quantity.value) - Number(choosenProducts[choosenProducts.indexOf(productChosed)].counter)));
                choosenProducts[choosenProducts.indexOf(productChosed)].counter = choosenProducts[choosenProducts.indexOf(productChosed)].counter + (quantity.value - choosenProducts[choosenProducts.indexOf(productChosed)].counter);
                localStorage.setItem('ecommerce', JSON.stringify(choosenProducts));
                document.getElementById('productAdd').setAttribute('href', 'cart.html');
            } else if ((productChosed.counter > quantity.value) && (quantity.value > 0)) {
                choosenProducts[choosenProducts.indexOf(productChosed)].totalPrice = productChosed.totalPrice - ((data.Price * (productChosed.counter - quantity.value)));
                choosenProducts[choosenProducts.indexOf(productChosed)].counter = productChosed.counter - (productChosed.counter - quantity.value);
                localStorage.setItem('ecommerce', JSON.stringify(choosenProducts));
                document.getElementById('productAdd').setAttribute('href', 'cart.html');

            } else if (productChosed.counter == quantity.value) {
                document.getElementById('productAdd').setAttribute('href', 'cart.html');

            } else if (quantity.value == 0 || quantity.value == '') {
                choosenProducts.splice(choosenProducts.indexOf(productChosed), 1);
                if (choosenProducts.length == 0) {
                    localStorage.removeItem('ecommerce');
                    document.getElementById('productAdd').setAttribute('href', 'index.html');
                } else {
                    localStorage.setItem('ecommerce', JSON.stringify(choosenProducts));
                    document.getElementById('productAdd').setAttribute('href', 'cart.html');
                }
            }
        }else if(productChosed.counter == productChosed.quantity){
             localStorage.setItem('ecommerce', JSON.stringify(choosenProducts));
            document.getElementById('productAdd').setAttribute('href', 'cart.html');
       
        }
            
        } else {
            
            if (quantity.value > 0) {
                newlyProductAdded.productId = data.ProductId;
                newlyProductAdded.counter = +quantity.value;
                newlyProductAdded.price=data.Price;
                newlyProductAdded.quantity=data.quantity;
                newlyProductAdded.name = data.productName;
                newlyProductAdded.ProductPicUrl = data.ProductPicUrl;
                newlyProductAdded.totalPrice = Number(data.Price) * quantity.value;
                choosenProducts.push(newlyProductAdded);
                localStorage.setItem('ecommerce', JSON.stringify(choosenProducts));
                newlyProductAdded = {};
                document.getElementById('productAdd').setAttribute('href', 'cart.html');
            }
            document.getElementById('productAdd').setAttribute('href', 'cart.html');
            
        }

    } else {
        
        if (quantity.value > 0) {
            productObjects = [];
            newlyProductAdded = {};
            newlyProductAdded.price=data.Price;
            newlyProductAdded.name = data.productName;
                newlyProductAdded.ProductPicUrl = data.ProductPicUrl;
            newlyProductAdded.productId = data.ProductId;
            newlyProductAdded.counter = +quantity.value;
            newlyProductAdded.totalPrice = Number(data.Price) * quantity.value;
            newlyProductAdded.quantity = data.quantity
            productObjects.push(newlyProductAdded);
            localStorage.setItem('ecommerce', JSON.stringify(productObjects));
            document.getElementById('productAdd').setAttribute('href', 'cart.html');
        } else {
            document.getElementById('productAdd').setAttribute('href', 'index.html');
        }
    }

});

function getProductInfoCounter(productForCheck){
let myproduct = JSON.parse(localStorage.getItem('ecommerce'));
let counter = 0;
if(myproduct){
    myproduct.forEach(product=>{
        if(product.productId == productForCheck){
            counter = product.counter;
            return product.counter;
        }

})
}

return counter;
}
