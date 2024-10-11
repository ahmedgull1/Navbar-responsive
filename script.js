let data = [];

const handleFetch = () => {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(json => {
        data = json;
        console.log(data);
        handleDisplay();
        handelCartDisp();
    });
}

handleFetch();

let navitem =['Home', 'Order', 'Products']
navitem.map((ele)=>{
    ul.innerHTML +=`
    <ul class=">
    <li class="">${ele}</li>
    </ul>
    `
})

btn.onclick = () =>{
    saidbar.classList.toggle('mr-[0%]')
}

function handleDisplay(){
    main.innerHTML ="";

    data.map((ele,index)=>{
        main.innerHTML +=`
        <div class="card border w-[305px] mx-auto h-96 rounded-xl">
            
            <img class="w-60 h-60 mx-auto" src=${ele.image} />
            <h4 class="truncate w-ful text-xl text-center mt-2 font-bold mx-4">${ele.title}</h4>
            <ul class="flex justify-around mt-2">
                <li class="font-bold text-lg">Price: $ ${ele.price}</li>
                <li class="font-bold text-lg">Rating: ${ele.rating.rate}</li>
            </ul>
            <li class="w-[90%] list-none mx-auto mt-4">
                <button onclick="handelCart(${index})" class="button border py-2 w-full text-center rounded-full ">Add to cart</button>
            </li>
        </div>
        `;   
    });
}


function handelCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let newObj = data[index]
    newObj.qty = 1

    cart.push(newObj);
    localStorage.setItem('cart', JSON.stringify(cart));

    handelCartDisp();
}

function handelCartDisp(){
let cart = JSON.parse(localStorage.getItem('cart')) || [];

     saidbar.innerHTML =""; 
    cart.map((ele,index) =>{
        saidbar.innerHTML +=`
        <div class="flex gap-4 ">
            <img class="w-60 h-60 " src=${ele.image} />
            <div class="list-none">
                <button onclick="{Remove(${index})}" class="ml-44 font-bold text-gray-400 hover:text-blue-700 ">Delete <i class="fa-solid fa-trash"></i></button>
                <li class=" text-white ">${ele.title} </li>
                <li class="mt-1  text-white"> men's Clothing </li>
                <li class="mt-1 text-white ">Price: $ ${ele.price} </li>
                <div class="flex gap-1 justify-end text-white">
                    <button onclick="decQty(${index})" class="w-10 h-8 rounded-md bg-red-500 text-black text-xl">-</button>
                    <p>${ele.qty}</p>
                    <button onclick="incQty(${index})" class="w-10 h-8 rounded-md bg-red-500 text-black text-xl">+</button>
                </div>
            </div>
        </div>
        `;
    });
}


function incQty(i){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart[i].qty++;

    localStorage.setItem("cart", JSON.stringify(cart))

    handelCartDisp()
    

}
    

function decQty(i){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if(i > 1){
        cart[i].qty--;
    
        localStorage.setItem("cart", JSON.stringify(cart))
    
        handelCartDisp();
    }
}

function Remove(currentIndex){  
let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.splice(currentIndex,1)
    localStorage.setItem('cart', JSON.stringify(cart));

    handelCartDisp()
}
