document.addEventListener("DOMContentLoaded", function () {
    const calcForm = document.getElementById("calcForm");
    const resultadoElement = document.getElementById("resultado");

    calcForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const peso = parseFloat(document.getElementById("peso").value);
        const altura = parseFloat(document.getElementById("altura").value) / 100;

        if (isNaN(peso) || isNaN(altura)) {
            resultadoElement.textContent = "Por favor, ingresa valores válidos.";
            return;
        }

        const imc = calcularIMC(peso, altura);
        const categoria = obtenerCategoriaIMC(imc);

        resultadoElement.textContent = `Tu IMC es ${imc.toFixed(2)}. Categoría: ${categoria}`;
    });

    function calcularIMC(peso, altura) {
        return peso / (altura * altura);
    }

    function obtenerCategoriaIMC(imc) {
        if (imc < 18.5) return "Bajo peso";
        if (imc < 24.9) return "Normal";
        if (imc < 29.9) return "Sobrepeso";
        return "Obeso";
    }

    const sections = document.querySelectorAll("section");
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3,
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const productos = document.querySelectorAll(".producto");
    const listaCarrito = document.querySelector(".lista-carrito");
    const totalSpan = document.getElementById("total");
    const vaciarCarritoBtn = document.querySelector(".vaciar-carrito");
  
    let carrito = [];
    
    productos.forEach((producto) => {
      const agregarBtn = producto.querySelector(".agregar");
      agregarBtn.addEventListener("click", () => {
        const nombre = producto.querySelector("p:nth-child(2)").textContent;
        const precio = parseFloat(producto.querySelector("p:nth-child(3)").textContent.slice(1));
        
        carrito.push({ nombre, precio });
        actualizarCarrito();
      });
    });
  
    vaciarCarritoBtn.addEventListener("click", () => {
      carrito = [];
      actualizarCarrito();
    });
  
    function actualizarCarrito() {
      listaCarrito.innerHTML = "";
      let total = 0;
      carrito.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${item.nombre}</span>
          <span>$${item.precio.toFixed(2)}</span>
          <button class="eliminar-item">Eliminar</button>
        `;
        total += item.precio;
        listaCarrito.appendChild(li);
      });
      totalSpan.textContent = `$${total.toFixed(2)}`;
  
      const eliminarBtns = document.querySelectorAll(".eliminar-item");
      eliminarBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          carrito.splice(index, 1);
          actualizarCarrito();
        });
      });
    }
  });