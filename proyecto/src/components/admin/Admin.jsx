import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Admin.module.css";


function Admin(){


    const {usuario}=useAuth();



    const [tipo,setTipo]=useState("refaccion");


    const [panel,setPanel]=useState("refacciones");


    const [productos,setProductos]=useState([]);


    const [usuarios,setUsuarios]=useState([]);


    const [stockEditado,setStockEditado]=useState({});



    const [formulario,setFormulario]=useState({


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



    //==============================
    // USUARIOS
    //==============================


    const [nombreUsuario,setNombreUsuario]=useState("");


    const [correoUsuario,setCorreoUsuario]=useState("");


    const [passwordUsuario,setPasswordUsuario]=useState("");


    const [rolUsuario,setRolUsuario]=useState("trabajador");
    //==============================
// CARGAR PRODUCTOS
//==============================


const cargarProductos=async()=>{


    try{


        const url = tipo==="refaccion"

        ? "http://localhost:3001/api/refacciones"

        : "http://localhost:3001/api/accesorios";



        const respuesta=await fetch(url);



        const datos=await respuesta.json();



        setProductos(datos);



        const stockInicial={};



        datos.forEach((producto)=>{


            stockInicial[

                producto.id_refaccion ||

                producto.id_accesorio

            ]=producto.stock;


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





//==============================
// CARGAR USUARIOS
//==============================


const cargarUsuarios = async()=>{


    try{


        const respuesta = await fetch(

            "http://localhost:3001/api/usuarios"

        );


        const datos = await respuesta.json();



        console.log("RESPUESTA USUARIOS:", datos);




        // Si el backend devuelve un arreglo
        if(Array.isArray(datos)){


            setUsuarios(datos);


        }


        // Si el backend devuelve {usuarios:[...]}

        else if(datos.usuarios){


            setUsuarios(datos.usuarios);


        }


        else{


            console.log("Formato incorrecto de usuarios");

            setUsuarios([]);


        }



    }


    catch(error){


        console.log("Error cargando usuarios:",error);


        setUsuarios([]);


    }


};





useEffect(()=>{


    if(panel==="usuarios"){


        cargarUsuarios();


    }


},[panel]);

//==============================
// ELIMINAR USUARIO
//==============================


const eliminarUsuario=async(id)=>{


    if(usuario?.id_usuario === id){

        alert("No puedes despedirte a ti mismo.");

        return;

    }


    const confirmar=window.confirm(

        "¿Deseas despedir a este trabajador?"

    );



    if(!confirmar) return;



    try{


        const respuesta=await fetch(


            `http://localhost:3001/api/usuarios/${id}`,


            {


                method:"DELETE"


            }


        );



        const datos=await respuesta.json();



        if(datos.success){


            alert("Trabajador despedido correctamente");


            cargarUsuarios();


        }


        else{


            alert(datos.mensaje);


        }


    }


    catch(error){


        console.log(error);


        alert("Error al despedir trabajador");


    }


};





//==============================
// CREAR USUARIO
//==============================


const crearUsuario=async(e)=>{


    e.preventDefault();



    try{


        const respuesta=await fetch(


            "http://localhost:3001/api/usuarios",


            {


                method:"POST",


                headers:{


                    "Content-Type":"application/json"


                },


                body:JSON.stringify({


                    nombre:nombreUsuario,


                    correo:correoUsuario,


                    contraseña:passwordUsuario,


                    rol:rolUsuario


                })


            }


        );



        const datos=await respuesta.json();



        if(datos.success){


            alert("Usuario creado correctamente");



            setNombreUsuario("");

            setCorreoUsuario("");

            setPasswordUsuario("");

            setRolUsuario("trabajador");



            cargarUsuarios();



        }


        else{


            alert(datos.mensaje);


        }


    }


    catch(error){


        console.log(error);


    }


};





//==============================
// CAMBIAR DATOS FORMULARIO
//==============================


const cambiarDato=(e)=>{


    setFormulario({


        ...formulario,


        [e.target.name]:e.target.value


    });


};
//==============================
// GUARDAR PRODUCTO
//==============================


const guardarProducto=async(e)=>{


    e.preventDefault();



    try{


        const url=tipo==="refaccion"


        ? "http://localhost:3001/api/refacciones"


        : "http://localhost:3001/api/accesorios";



        const datos=new FormData();



        Object.keys(formulario).forEach((campo)=>{


            if(formulario[campo]!==null){


                datos.append(

                    campo,

                    formulario[campo]

                );


            }


        });




        const respuesta=await fetch(url,{


            method:"POST",


            body:datos


        });




        const resultado=await respuesta.json();




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





//==============================
// ELIMINAR PRODUCTO
//==============================


const eliminarProducto=async(id)=>{


    const confirmar=window.confirm(


        "¿Deseas eliminar este producto?"


    );



    if(!confirmar) return;




    try{


        const url=tipo==="refaccion"


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





//==============================
// ACTUALIZAR STOCK
//==============================


const actualizarStock=async(id)=>{


    try{


        const url=tipo==="refaccion"


        ? `http://localhost:3001/api/refacciones/${id}`


        : `http://localhost:3001/api/accesorios/${id}`;





        const producto=productos.find(


            (p)=>

            (p.id_refaccion || p.id_accesorio)

            === id


        );





        const datos={


            ...producto,


            stock:stockEditado[id]


        };






        const respuesta=await fetch(url,{



            method:"PUT",



            headers:{


                "Content-Type":"application/json"


            },



            body:JSON.stringify(datos)



        });





        const resultado=await respuesta.json();





        if(resultado.success){



            alert("Stock actualizado correctamente");



            cargarProductos();



        }




    }


    catch(error){



        console.log(error);



        alert("Error al actualizar stock");



    }


};
return(

<section className={styles.admin}>


<div className={`${styles.contenedorAdmin} rounded-xl`}>



<h1 className={styles.titulo}>

    Panel Administrador

</h1>




{/* ==========================
    BOTONES DEL PANEL
========================== */}


<div className={styles.botones}>


<button

className={`${styles.boton} rounded-lg shadow-lg`}

onClick={()=>{

    setPanel("refacciones");

    setTipo("refaccion");

}}

>

🔧 Refacciones

</button>





<button

className={`${styles.boton} rounded-lg shadow-lg`}

onClick={()=>{

    setPanel("accesorios");

    setTipo("accesorio");

}}

>

🏍️ Accesorios

</button>





{

usuario?.rol==="admin" && (


<button

className={`${styles.boton} rounded-lg shadow-lg`}

onClick={()=>{

    setPanel("usuarios");

}}

>

👥 Usuarios

</button>


)

}


</div>





{/* ==========================
    PANEL USUARIOS
========================== */}



{

panel==="usuarios" && usuario?.rol==="admin" && (



<section className={`${styles.panelUsuarios} rounded-xl shadow-xl`}>



<h2>

Administrar usuarios

</h2>




<form

onSubmit={crearUsuario}

className={styles.formUsuarios}

>




<input

type="text"

placeholder="Nombre"

value={nombreUsuario}

onChange={(e)=>

setNombreUsuario(e.target.value)}

required

/>





<input

type="email"

placeholder="Correo"

value={correoUsuario}

onChange={(e)=>

setCorreoUsuario(e.target.value)}

required

/>





<input

type="password"

placeholder="Contraseña"

value={passwordUsuario}

onChange={(e)=>

setPasswordUsuario(e.target.value)}

required

/>





<select

value={rolUsuario}

onChange={(e)=>

setRolUsuario(e.target.value)}

>


<option value="trabajador">

Trabajador

</option>




<option value="admin">

Administrador

</option>



</select>





<button

className={`${styles.guardar} rounded-lg shadow-md`}

type="submit"

>

Crear usuario


</button>




</form>



</section>


)

}






{/* ==========================
    FORMULARIO PRODUCTO
========================== */}



{

panel!=="usuarios" && (


<form

onSubmit={guardarProducto}

className={`${styles.formProducto} rounded-xl shadow-xl`}

>


<h2 className={styles.tituloFormulario}>

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

tipo==="refaccion" && (


<input

className={styles.input}

name="numero_parte"

value={formulario.numero_parte}

placeholder="Número de parte"

onChange={cambiarDato}

/>


)

}





<textarea

className={styles.input}

name="descripcion"

value={formulario.descripcion}

placeholder="Descripción"

onChange={cambiarDato}

/>





{

tipo==="refaccion" && (


<textarea

className={styles.input}

name="especificaciones"

value={formulario.especificaciones}

placeholder="Especificaciones"

onChange={cambiarDato}

/>


)

}






<input

className={styles.input}

type="number"

name="precio"

value={formulario.precio}

placeholder="Precio"

onChange={cambiarDato}

/>






<input

className={styles.input}

type="number"

name="stock"

value={formulario.stock}

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

accept="image/*"

onChange={(e)=>{


setFormulario({

    ...formulario,

    imagen:e.target.files[0]

});


}}

/>







<button

className={`${styles.guardar} rounded-lg shadow-md`}

type="submit"

>

Guardar producto


</button>



</form>


)

}







{/* ==========================
    LISTADO PRODUCTOS
========================== */}



{

panel!=="usuarios" && (



<div className={`${styles.gridProductos} mt-10`}>



{

productos.map((producto)=>{


const id = producto.id_refaccion || producto.id_accesorio;




return(


<div

key={id}

className={`${styles.card} rounded-xl shadow-lg`}

>



<img

src={

producto.imagen

?

`http://localhost:3001${producto.imagen}`

:

"/imagenes/no-image.png"

}

alt={producto.nombre}

className="rounded-lg"

/>





<h3>

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

className={`${styles.stockBtn} shadow-md`}

onClick={()=>{


setStockEditado({

...stockEditado,


[id]:

Math.max(

0,

Number(stockEditado[id])-1

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

className={`${styles.stockBtn} shadow-md`}

onClick={()=>{


setStockEditado({

...stockEditado,


[id]:

Number(stockEditado[id])+1


});


}}

>

+

</button>



</div>





<button

className={`${styles.actualizar} rounded-lg shadow-md`}

onClick={()=>actualizarStock(id)}

>

Actualizar Stock

</button>





<button

className={`${styles.eliminar} rounded-lg shadow-md`}

onClick={()=>eliminarProducto(id)}

>

Eliminar

</button>



</div>


);


})


}



</div>


)

}

{/* ==========================
    LISTADO TRABAJADORES
========================== */}



{

panel==="usuarios" && usuario?.rol==="admin" && (



<div className={`${styles.gridProductos} mt-10`}>



{

usuarios.map((empleado)=>{



return(



<div

key={empleado.id_usuario}

className={`${styles.card} rounded-xl shadow-lg`}

>




<h3>

{empleado.nombre}

</h3>





<p>

{empleado.correo}

</p>





<p>

Rol: {empleado.rol}

</p>





<button

className={`${styles.eliminar} rounded-lg shadow-md mt-4`}

onClick={()=>eliminarUsuario(empleado.id_usuario)}

>

Despedir trabajador

</button>





</div>



);



})


}



</div>



)


}




</div>


</section>


);



}


export default Admin;