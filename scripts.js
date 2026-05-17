const btn = document.querySelector("#btn")
const menu = document.querySelector("#menu")

btn.addEventListener("click", () => {
     menu.classList.toggle("active")
     
})

const numb = document.querySelector("#number");
const price = document.querySelectorAll("h5")

let cont = 0;
const list = []
price.forEach((botao) => {
  botao.addEventListener("click", () =>{
     cont ++
     numb.textContent = cont;
     
    const item = botao.parentElement;
    const nome = item.querySelector("h4").textContent;
    const preco = item.querySelector(".price").textContent;

const existente = list.find((item) => item.nome === nome); 
if(existente){
     existente.quantidade++
}else {list.push({
     nome: nome,
     preco: preco,
     quantidade: 1
})

}


  })
})
const btncart = document.querySelector(".cart");
const cartBox = document.querySelector("#cart-box");

btncart.addEventListener("click", () => {
 
  if(cartBox.classList.contains("active")){
      cartBox.classList.remove("active")
  }else{
 cartBox.innerHTML = "";
 list.forEach((item) => {
    cartBox.innerHTML += `
      <p>
        ${item.nome} - ${item.quantidade}x - ${item.preco}
      </p>
    
    `;
    cartBox.classList.add("active")
  });
  }

 
});

const bnt1 = document.querySelector(".btn1");
const modal = document.querySelector(".modal");
const pedido = document.querySelector(".pedido");

bnt1.addEventListener("click", () => {
  modal.classList.add("active");

  pedido.innerHTML = "";

  let total = 0;

  list.forEach((item) => {
    const precoLimpo = Number(item.preco.replace("R$", ""));

    total += precoLimpo * item.quantidade;

    pedido.innerHTML += `
      <p>${item.quantidade}x ${item.nome} - R$ ${precoLimpo * item.quantidade}</p>
    `;
  });

  const mensagem = encodeURIComponent(
    list.map(item => `${item.quantidade}x ${item.nome}`).join(", ") +
    " | Total: R$ " + total
  );

  pedido.innerHTML += `
    <h3>Total: R$ ${total}</h3>

    <a href="https://wa.me/55SEUNUMERO?text=${mensagem}" target="_blank">
      <button class="fa-brands fa-whatsapp"> fazer pedido</button>
    </a>
  `;
});
const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});


