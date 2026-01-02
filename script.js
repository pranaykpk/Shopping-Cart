let cartComponent = document.querySelector(".cart");

const toggleCart=()=>{
    cartComponent.classList.toggle('hidden');
}
let cartItems = []
let subTotal = 0;

let displayItems = [
    {
        name:"Stylish T-shirt",
        price:29.99,
        img:"t-shirt.jpeg",
    },
    {
        name:"Modern Watch",
        price:149.99,
        img:"watch.jpeg",
    },
    {
        name:"Leather Backpack",
        price:89.99,
        img:"leather-backpack.jpeg",
    },
    {
        name:"Sunglasses",
        price:49.99,
        img:"sunglasses.jpeg",
    },
]

displayItems.forEach((item,idx)=>{
    document.querySelector(".display-items").innerHTML+=`
        <div class="card" id="${idx}">
            <img src="./assets/pics/${item.img}" alt="item-img">
            <div class="info">
                <h3 class="name">${item.name}</h3>
                <p class="price">$${item.price}</p>
            </div>
            <button onclick="addToCart('${item.name}','./assets/pics/${item.img}',${item.price})">Add to cart</button>
        </div>
    `
})

const cartRender=()=>{
    document.querySelector(".cart-items").innerHTML = "";
    subTotal=0;
    cartItems.forEach((item,idx)=>{
        subTotal+=item.price*item.qty;
        document.querySelector(".cart-items").innerHTML+= `
        <div class="cart-card">
                <img src="${item.img}" alt="">
                <div class="cart-item-info">
                    <p name="name">${item.name}</p>
                    <h5>$${item.price}</h5>
                </div>
                <div class="qty-options">
                <button onClick="changeQty(${idx},-1)">-</button>
                <p name="itemsCount">${item.qty}</p>
                <button onClick="changeQty(${idx},+1)">+</button>
                </div>
            </div>
        `
    }
    )
    document.getElementById("subtotal").innerHTML ='$'+subTotal.toFixed(2);
    document.getElementById("total").innerHTML ='$'+(Number(subTotal.toFixed(2))+5);
    document.querySelectorAll(".cartCount").forEach(tag=>tag.innerHTML = cartItems.length)
    if(cartItems.length>0) document.querySelector("#shipping").innerHTML = `$5.00`
}

const addToCart=(name,img,price)=>{
    let exist = cartItems.find(item =>item.name === name);
    if(exist){
        exist.qty++;
    }else{
        cartItems.push({name,img,price,qty:1})
    }
    cartRender();
}

const changeQty=(index,number)=>{
    cartItems[index].qty +=number; 
    if(cartItems[index].qty<1){
        cartItems.splice(index,1);
    }
    cartRender();
}