let listaVehiculos = [];

const contenedor = document.querySelector(".contenedor-tarjetas");
const buscador = document.querySelector("#buscador");

fetch("./data/vehiculos.json")
    .then((respuesta) => respuesta.json())
    .then((vehiculos) => {

        listaVehiculos = vehiculos;

        mostrarVehiculos(listaVehiculos);

    })
        .catch(() => {

        Swal.fire({

            icon: "error",
            title: "Error",
            text: "No se pudieron cargar los vehículos."

        });

    });

function mostrarVehiculos(lista){

    contenedor.innerHTML = "";

    if (lista.length === 0) {

    contenedor.innerHTML = `
        <h2>No se encontraron vehículos.</h2>
    `;

    return;
}

    lista.forEach((vehiculo)=>{

        contenedor.innerHTML += `

            <div class="tarjeta">

                <img src="${vehiculo.imagen}" alt="${vehiculo.modelo}">

                <div class="info-tarjeta">

                    <p>${vehiculo.marca}</p>

                    <h2>${vehiculo.modelo}</h2>

                </div>

            </div>

        `;

    });

    document.querySelectorAll(".tarjeta").forEach((tarjeta, indice)=>{

    tarjeta.addEventListener("click",()=>{

        const vehiculo = lista[indice];

        Swal.fire({

            title: vehiculo.marca + " " + vehiculo.modelo,

            html:`

                <p><b>Años:</b> ${vehiculo.anio}</p>

                <p><b>Motor:</b> ${vehiculo.motor}</p>

                <p><b>Transmisión:</b> ${vehiculo.transmision}</p>

            `,

            imageUrl:vehiculo.imagen,

            imageWidth:300,

            confirmButtonText:"Cerrar"

        });

    });

});

}

buscador.addEventListener("input", ()=>{

    const texto = buscador.value.toLowerCase();

    const resultado = listaVehiculos.filter((vehiculo)=>{

        return (
            vehiculo.marca.toLowerCase().includes(texto) ||
            vehiculo.modelo.toLowerCase().includes(texto)
        );

    });

    mostrarVehiculos(resultado);

});

const botonesMarca = document.querySelectorAll(".contenedor-filtros button");

botonesMarca[0].classList.add("boton-activo");

botonesMarca.forEach((boton) => {

    boton.addEventListener("click", () => {

        botonesMarca.forEach((b) => {
        
            b.classList.remove("boton-activo");
        
        });

        boton.classList.add("boton-activo");

        const marca = boton.dataset.marca;

        if (marca === "Todas") {

            mostrarVehiculos(listaVehiculos);

            return;

        }

        const filtrados = listaVehiculos.filter((vehiculo) => {

            return vehiculo.marca === marca;

        });

        mostrarVehiculos(filtrados);

    });

});