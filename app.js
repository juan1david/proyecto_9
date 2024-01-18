// Importa la librería 'colors' para dar formato al texto en la consola.
require('colors');

// Importa la librería 'fs' para trabajar con el sistema de archivos.
const fs = require('fs');

// Importa los datos del archivo 'datos1.json'.
const datosArchivo = require('./datos1.json');

// Define una función asincrónica principal llamada 'main'.
const main = async () => {
    // Limpia la consola y muestra un encabezado del proyecto.
    console.clear();
    console.log('***********************');
    console.log('**  PROYECTO CLASES  **');
    console.log('***********************\n');

    // Define una clase llamada Producto con atributos.
    class Producto {
        #codigoproducto;
        #nombreproducto;
        #inventarioproducto;
        #precioproducto;

        // Constructor de la clase para dar un valor a sus atributos.
        constructor() {
            this.#codigoproducto = '';
            this.#nombreproducto = '';
            this.#inventarioproducto = 0;
            this.#precioproducto = 0;
        }

        // Métodos setter y getter para dar un valor a codigoproducto.
        set setcodigoproducto(value) {
            this.#codigoproducto = value;
        }

        get getcodigoproducto() {
            return this.#codigoproducto;
        }

        // Métodos setter y getter para dar un valor a nombreproducto.
        set setnombreproducto(value) {
            this.#nombreproducto = value;
        }

        get getnombreproducto() {
            return this.#nombreproducto;
        }

        // Métodos setter y getter para dar un valor a inventarioproducto.
        set setinventarioproducto(value) {
            this.#inventarioproducto = value;
        }

        get getinventarioproducto() {
            return this.#inventarioproducto;
        }

        // Métodos setter y getter para dar un valor a precioproducto.
        set setprecioproducto(value) {
            this.#precioproducto = value;
        }

        get getprecioproducto() {
            return this.#precioproducto;
        }
    }       

    // clase para definir y almacenar los productosde la tienda.
    class ProductosTienda{
        #listaproductos;

        // Constructor inicializa un array vacío para almacenar productos.
        constructor(){
            this.#listaproductos = [];
        }
        
        // Método getter para obtener la lista de productos.
        get getlistaproductos(){
            return this.#listaproductos;
        }

        // Método para cargar datos de productos desde un archivo.
        cargaarchivoproductos(){
            // variable que cumple su funcion cuando el contador este en 0.
            let contador = 0;
            // Verifica si hay datos en el archivo (datosArchivo).
            if(datosArchivo.length > 0){
                // Itera a través de cada objeto en datosArchivo.
                datosArchivo.forEach(objeto => {
                    contador++;
                    // Crea una nueva instancia de la clase Producto.
                    let producto = new Producto;
                    // Establece las propiedades del producto utilizando datos del archivo.
                    producto.setcodigoproducto = objeto.codigoproducto;
                    producto.setnombreproducto = objeto.nombreproducto;
                    producto.setinventarioproducto = objeto.inventarioproducto;
                    producto.setprecioproducto = objeto.precioproducto;                    
                    // Agrega el producto a la lista de productos. 
                    this.#listaproductos.push(producto);                    
                });
            } else{
                // Imprime un mensaje de error si el archivo está vacío.
                console.log(`ERROR, el archivo datos1.json no contiene datos\n`.bgRed);
            }
            // Imprime un mensaje del total de productos.
            console.log(`total de productos cargados ==> `.bgBlue + ` ${contador} `.bgRed);
        }

        // Método para guardar datos de productos en un archivo.
        grabararchivoproductos(){
            //crea un nuevo objeto con propiedades específicas seleccionadas de cada producto original.
            const instanciaclaseaobjetos = this.getlistaproductos.map(producto =>{
                return {
                    codigoproducto: producto.getcodigoproducto,
                    nombreproducto: producto.getnombreproducto,
                    inventarioproducto: producto.getinventarioproducto,
                    precioproducto: producto.getprecioproducto
                };
            });

            // Convierte el array de objetos a una cadena JSON formateada.
            const cadenaJson = JSON.stringify(instanciaclaseaobjetos,null,2);
            // Especifica el nombre del archivo para guardar los datos JSON.
            const nombrearchivo = 'datos1.json';
            // Escribe los datos JSON en el archivo.
            fs.writeFileSync(nombrearchivo, cadenaJson, 'utf-8');

            // Imprime un mensaje indicando que los datos se han guardado.
            console.log(`DATOS GUARDADOS EN ${nombrearchivo}`.bgMagenta);

        }

        // Método para mostrar la información de todos los productos en la consola.
        mostrarproductos(){
            // Imprime las propiedades de cada producto en un formato tabular.
            this.getlistaproductos.forEach(producto => {
                console.log(`|     ` + producto.getcodigoproducto + `     |` +
                            `      ` + producto.getnombreproducto + `     |` +
                            `      ` + producto.getinventarioproducto + `     |` +
                            `      ` + producto.getprecioproducto + `     |`);                
            })
        }    
    }

    // Crear una instancia de la clase ProductosTienda.
    let productostienda = new ProductosTienda;

    // Cargar productos desde un archivo.
    productostienda.cargaarchivoproductos();
    
    // Imprimir un mensaje indicando que se están mostrando datos de apertura de la tienda.
    console.log(`DATOS APERTURA TIENDA`.bgBlue);

    // Mostrar la información de todos los productos en la consola.
    productostienda.mostrarproductos();

    // Actualizar el inventario de cada producto con valores aleatorios.
    productostienda.getlistaproductos.forEach(producto =>{
        producto.setinventarioproducto = Math.floor(Math.random() * (20 - 1) + 1);
    });

    // Imprimir un mensaje indicando que se están mostrando datos de cierre de la tienda.
    console.log(`DATOS CIERRE TIENDA`.bgGreen);
    // Mostrar la información actualizada de todos los productos en la consola.
    productostienda.mostrarproductos();
    // Guardar los datos actualizados en un archivo.
    productostienda.grabararchivoproductos();

}

// Función principal que ejecuta todas las acciones anteriores.
main();