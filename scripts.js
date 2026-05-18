const btn = document.querySelector("#btn");
const menu = document.querySelector("#menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

const numb = document.querySelector("#number");
const priceButtons = document.querySelectorAll("h5");

let cont = 0;
const list = [];

priceButtons.forEach((botao) => {
  botao.addEventListener("click", () => {
    cont++;
    numb.textContent = cont;

    const item = botao.parentElement;

    const nome = item.querySelector("h4").textContent;
    const precoTexto = item.querySelector(".price").textContent;

    const preco = Number(precoTexto.replace("R$", "").replace(",", "."));

    const existente = list.find((p) => p.nome === nome);

    if (existente) {
      existente.quantidade++;
    } else {
      list.push({
        nome,
        preco,
        quantidade: 1,
      });
    }
  });
});

const btncart = document.querySelector(".cart");
const cartBox = document.querySelector("#cart-box");

btncart.addEventListener("click", () => {
  if (cartBox.classList.contains("active")) {
    cartBox.classList.remove("active");
  } else {
    cartBox.innerHTML = "";

    list.forEach((item) => {
      cartBox.innerHTML += `
        <p>${item.nome} - ${item.quantidade}x</p>
      `;
    });

    cartBox.classList.add("active");
  }
});

const btnModal = document.querySelector(".btn1");
const modal = document.querySelector(".modal");
const pedido = document.querySelector(".pedido");
const closeBtn = document.querySelector(".close");

btnModal.addEventListener("click", () => {
  modal.classList.add("active");
  atualizarModal();
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

function atualizarModal() {
  pedido.innerHTML = "";

  let total = 0;

  list.forEach((item, index) => {
    total += item.preco * item.quantidade;

    pedido.innerHTML += `
      <div class="item" data-index="${index}">
        <div class="info">
          <span class="nome">${item.nome}</span>
          <span class="preco">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
        </div>

        <div class="controls">
          <button class="menos">-</button>
          <span class="quantidade">${item.quantidade}</span>
          <button class="mais">+</button>
        </div>
      </div>
    `;
  });

  pedido.innerHTML += `
    <h3>Total: R$ ${total.toFixed(2)}</h3>

    <a href="https://wa.me/55SEUNUMERO?text=${encodeURIComponent(
      list.map((i) => `${i.quantidade}x ${i.nome}`).join(", ") +
      " | Total: R$ " + total.toFixed(2)
    )}" target="_blank">
      <button class="fa-brands fa-whatsapp">
        fazer pedido
      </button>
    </a>
  `;
}

pedido.addEventListener("click", (e) => {
  const itemDiv = e.target.closest(".item");
  if (!itemDiv) return;

  const index = itemDiv.dataset.index;

  if (e.target.classList.contains("menos")) {
    if (list[index].quantidade > 1) {
      list[index].quantidade--;
      cont--;
      numb.textContent = cont;
    }
  }

  if (e.target.classList.contains("mais")) {
    list[index].quantidade++;
    cont++;
    numb.textContent = cont;
  }

  atualizarModal();
});