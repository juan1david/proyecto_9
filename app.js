require ('colors');
const fs = require('fs');

const datosArchivo = require('./datos1.json');

const main = async() =>{
    console.clear();
    console.log('***********************');
    console.log('**  PROYECTO CLASES  **');
    console.log('***********************\n');

    class Producto{
        #codigoproducto;
        #nombreproducto;
        #inventarioproducto;
        #precioproducto;

        constructor(){
            this.#codigoproducto = '';
            this.#nombreproducto = '';
            this.#inventarioproducto = 0;
            this.#precioproducto = 0;
        }

        set setcodigoproducto(value){
            this.#codigoproducto = value;
        }

        get getcodigoproducto(){
            return this.#codigoproducto;
        }

        set setnombreproducto(value){
            this.#nombreproducto = value;
        }

        get getnombreproducto(){
            return this.#nombreproducto;
        }

        set setinventarioproducto(value){
            this.#inventarioproducto = value;
        }

        get getinventarioproducto(){
            return this.#inventarioproducto;
        }

        set setprecioproducto(value){
            this.#precioproducto = value;
        }

        get getprecioproducto(){
            return this.#precioproducto;
        }
    }       

    class ProductosTienda{
        #listaproductos;

        constructor(){
            this.#listaproductos = [];
        }

        get getlistaproductos(){
            return this.#listaproductos;
        }

        cargaarchivoproductos(){
            let contador = 0;
            if(datosArchivo.length > 0){
                datosArchivo.forEach(objeto => {
                    contador++;
                    let producto = new Producto;
                    producto.setcodigoproducto = objeto.codigoproducto;
                    producto.setnombreproducto = objeto.nombreproducto;
                    producto.setinventarioproducto = objeto.inventarioproducto;
                    producto.setprecioproducto = objeto.precioproducto;
                    this.#listaproductos.push(producto);                    
                });
            } else{
                console.log(`ERROR, el archivo datos1.json no contiene datos\n`.bgRed);
            }
            console.log(`total de productos cargados ==> `.bgBlue + ` ${contador} `.bgRed);
        }

        grabararchivoproductos(){
            const instanciaclaseaobjetos = this.getlistaproductos.map(producto =>{
                return {
                    codigoproducto: producto.getcodigoproducto,
                    nombreproducto: producto.getnombreproducto,
                    inventarioproducto: producto.getinventarioproducto,
                    precioproducto: producto.getprecioproducto
                };
            });

            const cadenaJson = JSON.stringify(instanciaclaseaobjetos,null,2);
            const nombrearchivo = 'datos1.json';
            fs.writeFileSync(nombrearchivo, cadenaJson, 'utf-8');

            console.log(`DATOS GUARDADOS EN ${nombrearchivo}`.bgMagenta);

        }

        mostrarproductos(){
            this.getlistaproductos.forEach(producto => {
                console.log(`|     ` + producto.getcodigoproducto + `     |` +
                            `      ` + producto.getnombreproducto + `     |` +
                            `      ` + producto.getinventarioproducto + `     |` +
                            `      ` + producto.getprecioproducto + `     |`);                
            })
        }    
    }

    let productostienda = new ProductosTienda;

    productostienda.cargaarchivoproductos();

    console.log(`DATOS APERTURA TIENDA`.bgBlue);

    productostienda.mostrarproductos();

    productostienda.getlistaproductos.forEach(producto =>{
        producto.setinventarioproducto = Math.floor(Math.random() * (20 - 1) + 1);
    });

    console.log(`DATOS CIERRE TIENDA`.bgGreen);
    productostienda.mostrarproductos();

    productostienda.grabararchivoproductos();

}

main();