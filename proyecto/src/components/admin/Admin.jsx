import { useEffect, useState } from "react";
import styles from "./Admin.module.css";

function Admin() {

    const [tipo, setTipo] = useState("refaccion");

    const [productos, setProductos] = useState([]);

    const [stockEditado, setStockEditado] = useState({});

    const [formulario, setFormulario] = useState({

        nombre:"",
        numero_parte:"",
        descripcion:"",
        especificaciones:"",
        precio:"",
        stock:"",
        imagen:null,
        garantia:"",
        disponible:true,
        id_categoria:1

    });

    const cargarProductos = async()=>{

        try{

            const url = tipo === "refaccion"

            ? "http://localhost:3001/api/refacciones"

            : "http://localhost:3001/api/accesorios";

            const respuesta = await fetch(url);

            const datos = await respuesta.json();

            setProductos(datos);

            const stockInicial = {};

            datos.forEach((producto)=>{

                stockInicial[
                    producto.id_refaccion || producto.id_accesorio
                ] = producto.stock;

            });

            setStockEditado(stockInicial);

        }

        catch(error){

            console.log(error);

        }

    };

    useEffect(()=>{

        cargarProductos();

    },[tipo]);
        const cambiarDato=(e)=>{

        setFormulario({

            ...formulario,

            [e.target.name]:e.target.value

        });

    };



    const guardarProducto = async(e)=>{

        e.preventDefault();

        try{

            const url = tipo === "refaccion"

            ? "http://localhost:3001/api/refacciones"

            : "http://localhost:3001/api/accesorios";

            const datos = new FormData();

            Object.keys(formulario).forEach((campo)=>{

                if(formulario[campo] !== null){

                    datos.append(

                        campo,

                        formulario[campo]

                    );

                }

            });

            const respuesta = await fetch(url,{

                method:"POST",

                body:datos

            });

            const resultado = await respuesta.json();

            if(resultado.success){

                alert("Producto agregado correctamente");

                setFormulario({

                    nombre:"",
                    numero_parte:"",
                    descripcion:"",
                    especificaciones:"",
                    precio:"",
                    stock:"",
                    imagen:null,
                    garantia:"",
                    disponible:true,
                    id_categoria:1

                });

                cargarProductos();

            }

        }

        catch(error){

            console.log(error);

            alert("Error al guardar producto");

        }

    };



    const eliminarProducto = async(id)=>{

        try{

            const url = tipo === "refaccion"

            ? `http://localhost:3001/api/refacciones/${id}`

            : `http://localhost:3001/api/accesorios/${id}`;

            await fetch(url,{

                method:"DELETE"

            });

            alert("Producto eliminado");

            cargarProductos();

        }

        catch(error){

            console.log(error);

        }

    };
        const actualizarStock = async(id)=>{

        try{

            const url = tipo === "refaccion"

            ? `http://localhost:3001/api/refacciones/${id}`

            : `http://localhost:3001/api/accesorios/${id}`;

            const producto = productos.find((p)=>

                (p.id_refaccion || p.id_accesorio) === id

            );

            const datos = {

                ...producto,

                stock: stockEditado[id]

            };

            const respuesta = await fetch(url,{

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify(datos)

            });

            const resultado = await respuesta.json();

            if(resultado.success){

                alert("Stock actualizado correctamente");

                cargarProductos();

            }

        }

        catch(error){

            console.log(error);

            alert("Error al actualizar el stock");

        }

    };
        return (

        <section

            className={`
                ${styles.admin}
                px-4
                py-10
                md:px-10
            `}

        >

            <div

                className="
                    max-w-7xl
                    mx-auto
                "

            >

                <h1

                    className="
                        text-3xl
                        md:text-5xl
                        font-bold
                        text-center
                    "

                >

                    Panel Administrador

                </h1>

                <div className={styles.botones}>

                    <button

                        className={styles.boton}

                        onClick={()=>setTipo("refaccion")}

                    >

                        Refacciones

                    </button>

                    <button

                        className={styles.boton}

                        onClick={()=>setTipo("accesorio")}

                    >

                        Accesorios

                    </button>

                </div>

                <form

                    onSubmit={guardarProducto}

                    className="
                        bg-white
                        rounded-2xl
                        shadow-lg
                        p-6
                        md:p-10
                        max-w-xl
                        mx-auto
                        grid
                        gap-5
                    "

                >

                    <h2

                        className="
                            text-2xl
                            font-bold
                            text-center
                        "

                    >

                        Agregar {tipo}

                    </h2>

                    <input

                        className={styles.input}

                        name="nombre"

                        value={formulario.nombre}

                        placeholder="Nombre del producto"

                        onChange={cambiarDato}

                    />

                    {

                        tipo==="refaccion" &&

                        <input

                            className={styles.input}

                            name="numero_parte"

                            value={formulario.numero_parte}

                            placeholder="Número de parte"

                            onChange={cambiarDato}

                        />

                    }

                    <textarea

                        className={styles.input}

                        name="descripcion"

                        value={formulario.descripcion}

                        placeholder="Descripción"

                        onChange={cambiarDato}

                    />
                                        {

                        tipo==="refaccion" &&

                        <textarea

                            className={styles.input}

                            name="especificaciones"

                            value={formulario.especificaciones}

                            placeholder="Especificaciones técnicas"

                            onChange={cambiarDato}

                        />

                    }

                    <input

                        className={styles.input}

                        name="precio"

                        value={formulario.precio}

                        type="number"

                        placeholder="Precio"

                        onChange={cambiarDato}

                    />

                    <input

                        className={styles.input}

                        name="stock"

                        value={formulario.stock}

                        type="number"

                        placeholder="Stock"

                        onChange={cambiarDato}

                    />

                    <input

                        className={styles.input}

                        name="garantia"

                        value={formulario.garantia}

                        placeholder="Garantía"

                        onChange={cambiarDato}

                    />

                    <input

                        className={styles.input}

                        type="file"

                        name="imagen"

                        accept="image/*"

                        onChange={(e)=>{

                            setFormulario({

                                ...formulario,

                                imagen:e.target.files[0]

                            });

                        }}

                    />

                    <button

                        className={styles.guardar}

                        type="submit"

                    >

                        Guardar producto

                    </button>

                </form>

                <div

                    className="
                        mt-14
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-8
                    "

                ></div>
                                {

                    productos.map((producto)=>{

                        const id = producto.id_refaccion || producto.id_accesorio;

                        return(

                            <div

                                key={id}

                                className={styles.card}

                            >

                                <img

                                    src={
                                        producto.imagen
                                        ? `http://localhost:3001${producto.imagen}`
                                        : "/imagenes/no-image.png"
                                    }

                                    alt={producto.nombre}

                                    className="
                                        w-full
                                        h-44
                                        object-contain
                                    "

                                />

                                <h3

                                    className="
                                        text-xl
                                        font-bold
                                        mt-4
                                    "

                                >

                                    {producto.nombre}

                                </h3>

                                <p>

                                    ${producto.precio}

                                </p>

                                <p>

                                    Stock: {stockEditado[id]}

                                </p>

                                <div className={styles.stockControles}>

                                    <button

                                        className={styles.stockBtn}

                                        onClick={()=>{

                                            setStockEditado({

                                                ...stockEditado,

                                                [id]:Math.max(
                                                    0,
                                                    Number(stockEditado[id]) - 1
                                                )

                                            });

                                        }}

                                    >

                                        −

                                    </button>

                                    <span className={styles.stockNumero}>

                                        {stockEditado[id]}

                                    </span>

                                    <button

                                        className={styles.stockBtn}

                                        onClick={()=>{

                                            setStockEditado({

                                                ...stockEditado,

                                                [id]:
                                                Number(stockEditado[id]) + 1

                                            });

                                        }}

                                    >

                                        +

                                    </button>

                                </div>
                                                                <button

                                    className={styles.actualizar}

                                    onClick={()=>actualizarStock(id)}

                                >

                                    Actualizar Stock

                                </button>

                                <button

                                    className={styles.eliminar}

                                    onClick={()=>eliminarProducto(id)}

                                >

                                    Eliminar

                                </button>

                            </div>

                        );

                    })

                }
                                </div>

            

        </section>

    );

}

export default Admin;