require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const app = express();

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },

    filename:(req,file,cb)=>{

        cb(
            null,
            Date.now()+path.extname(file.originalname)
        );

    }

});


const upload = multer({

    storage:storage

});


app.use(
    "/uploads",
    express.static("uploads")
);
//==================================================
// CONFIGURACIÓN DEL SERVIDOR
//==================================================

app.use(cors());

app.use(express.json());

//==================================================
// CONEXIÓN A MYSQL
//==================================================

const db = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});

//==================================================
// COMPROBAR CONEXIÓN
//==================================================

(async () => {

    try {

        const conexion = await db.getConnection();

        console.log("✅ Base de datos conectada correctamente");

        conexion.release();

    }

    catch (error) {

        console.log(error);

    }

})();

//==================================================
// LOGIN ADMINISTRADOR
//==================================================

app.post("/api/login", async (req, res) => {

    try {

        const {

            correo,

            contraseña

        } = req.body;

        const [usuario] = await db.query(

            `SELECT *

            FROM usuarios

            WHERE correo=? AND contraseña=?`,

            [

                correo,

                contraseña

            ]

        );

        if (usuario.length === 0) {

            return res.status(401).json({

                success: false,

                mensaje: "Correo o contraseña incorrectos"

            });

        }

        const token = jwt.sign(

            {
                id: usuario[0].id_usuario,
                correo: usuario[0].correo,
                rol: usuario[0].rol
            },
            process.env.JWT_SECRET || "secreto123",
            { expiresIn: "8h" }

        );

        res.json({

            success: true,
            usuario: usuario[0],
            token

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error del servidor"

        });

    }

});

//==================================================
// OBTENER TODAS LAS CATEGORÍAS
//==================================================

app.get("/api/categorias", async (req, res) => {

    try {

        const [datos] = await db.query(

            `SELECT *

            FROM categorias

            ORDER BY nombre`

        );

        res.json(datos);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error al obtener categorías"

        });

    }

});

//==================================================
// OBTENER TODOS LOS MODELOS
//==================================================

app.get("/api/modelos", async (req, res) => {

    try {

        const [datos] = await db.query(

            `SELECT *

            FROM modelos_motocicleta

            ORDER BY modelo, anio`

        );

        res.json(datos);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error al obtener modelos"

        });

    }

});

//==================================================
// OBTENER TODAS LAS REFACCIONES
//==================================================

app.get("/api/refacciones", async (req, res) => {

    try {

        const [datos] = await db.query(

            `SELECT

                r.id_refaccion,

                r.nombre,

                r.numero_parte,

                r.descripcion,

                r.especificaciones,

                r.precio,

                r.stock,

                r.imagen,

                r.garantia,

                r.disponible,

                c.id_categoria,

                c.nombre AS categoria

            FROM refacciones r

            INNER JOIN categorias c

            ON r.id_categoria = c.id_categoria

            ORDER BY c.nombre,r.nombre`

        );

        res.json(datos);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error al obtener refacciones"

        });

    }

});
//==================================================
// OBTENER UNA REFACCIÓN
//==================================================

app.get("/api/refacciones/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [datos] = await db.query(

            `SELECT

                r.*,

                c.nombre AS categoria

            FROM refacciones r

            INNER JOIN categorias c

            ON r.id_categoria = c.id_categoria

            WHERE r.id_refaccion = ?`,

            [id]

        );

        if (datos.length === 0) {

            return res.status(404).json({

                success: false,

                mensaje: "Refacción no encontrada"

            });

        }

        res.json(datos[0]);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error del servidor"

        });

    }

});

//==================================================
// BUSCAR REFACCIONES POR CATEGORÍA
//==================================================

app.get("/api/refacciones/categoria/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [datos] = await db.query(

            `SELECT

                r.*,

                c.nombre AS categoria

            FROM refacciones r

            INNER JOIN categorias c

            ON r.id_categoria = c.id_categoria

            WHERE r.id_categoria = ?

            ORDER BY r.nombre`,

            [id]

        );

        res.json(datos);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error del servidor"

        });

    }

});

//==================================================
// BUSCAR REFACCIONES POR NOMBRE
//==================================================

app.get("/api/refacciones/buscar/:texto", async (req, res) => {

    try {

        const { texto } = req.params;

        const [datos] = await db.query(

            `SELECT

                r.*,

                c.nombre AS categoria

            FROM refacciones r

            INNER JOIN categorias c

            ON r.id_categoria = c.id_categoria

            WHERE r.nombre LIKE ?

            ORDER BY r.nombre`,

            [`%${texto}%`]

        );

        res.json(datos);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error del servidor"

        });

    }

});

//==================================================
// BUSCAR POR NÚMERO DE PARTE
//==================================================

app.get("/api/refacciones/parte/:numero", async (req, res) => {

    try {

        const { numero } = req.params;

        const [datos] = await db.query(

            `SELECT

                r.*,

                c.nombre AS categoria

            FROM refacciones r

            INNER JOIN categorias c

            ON r.id_categoria = c.id_categoria

            WHERE r.numero_parte = ?`,

            [numero]

        );

        if (datos.length === 0) {

            return res.status(404).json({

                success: false,

                mensaje: "Número de parte no encontrado"

            });

        }

        res.json(datos[0]);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error del servidor"

        });

    }

});

//==================================================
// AGREGAR REFACCIÓN
//==================================================

app.post("/api/refacciones", upload.single("imagen"), async (req, res) => {

    try {

        const {

            nombre,
            numero_parte,
            descripcion,
            especificaciones,
            precio,
            stock,
            garantia,
            disponible,
            id_categoria

        } = req.body;


        const imagen = req.file
        ? `/uploads/${req.file.filename}`
        : "";


        const [resultado] = await db.query(

            `INSERT INTO refacciones
            (
                nombre,
                numero_parte,
                descripcion,
                especificaciones,
                precio,
                stock,
                imagen,
                garantia,
                disponible,
                id_categoria
            )

            VALUES (?,?,?,?,?,?,?,?,?,?)`,

            [

                nombre,
                numero_parte,
                descripcion,
                especificaciones,
                precio,
                stock,
                imagen,
                garantia,
                disponible,
                id_categoria

            ]

        );


        res.status(201).json({

            success:true,

            mensaje:"Refacción agregada correctamente",

            id:resultado.insertId

        });


    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error al agregar refacción"

        });

    }

});

//==================================================
// ACTUALIZAR REFACCIÓN
//==================================================

app.put("/api/refacciones/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const {

            nombre,
            numero_parte,
            descripcion,
            especificaciones,
            precio,
            stock,
            imagen,
            garantia,
            disponible,
            id_categoria

        } = req.body;

        await db.query(

            `UPDATE refacciones SET

                nombre=?,
                numero_parte=?,
                descripcion=?,
                especificaciones=?,
                precio=?,
                stock=?,
                imagen=?,
                garantia=?,
                disponible=?,
                id_categoria=?

            WHERE id_refaccion=?`,

            [

                nombre,
                numero_parte,
                descripcion,
                especificaciones,
                precio,
                stock,
                imagen,
                garantia,
                disponible,
                id_categoria,
                id

            ]

        );

        res.json({

            success: true,

            mensaje: "Refacción actualizada correctamente"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error al actualizar"

        });

    }

});

//==================================================
// ELIMINAR REFACCIÓN
//==================================================

app.delete("/api/refacciones/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(

            "DELETE FROM refacciones WHERE id_refaccion=?",

            [id]

        );

        res.json({

            success: true,

            mensaje: "Refacción eliminada correctamente"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error al eliminar"

        });

    }

});
//==================================================
// OBTENER TODOS LOS ACCESORIOS
//==================================================

app.get("/api/accesorios", async (req, res) => {

    try {

        const [datos] = await db.query(

            `SELECT

                a.id_accesorio,

                a.nombre,

                a.descripcion,

                a.precio,

                a.stock,

                a.imagen,

                a.garantia,

                a.disponible,

                c.id_categoria,

                c.nombre AS categoria

            FROM accesorios a

            INNER JOIN categorias c

            ON a.id_categoria = c.id_categoria

            ORDER BY c.nombre,a.nombre`

        );

        res.json(datos);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error al obtener accesorios"

        });

    }

});

//==================================================
// OBTENER UN ACCESORIO
//==================================================

app.get("/api/accesorios/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [datos] = await db.query(

            `SELECT

                a.*,

                c.nombre AS categoria

            FROM accesorios a

            INNER JOIN categorias c

            ON a.id_categoria = c.id_categoria

            WHERE a.id_accesorio = ?`,

            [id]

        );

        if (datos.length === 0) {

            return res.status(404).json({

                success:false,

                mensaje:"Accesorio no encontrado"

            });

        }

        res.json(datos[0]);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error del servidor"

        });

    }

});

//==================================================
// BUSCAR ACCESORIOS POR CATEGORÍA
//==================================================

app.get("/api/accesorios/categoria/:id", async (req,res)=>{

    try{

        const {id}=req.params;

        const [datos]=await db.query(

            `SELECT

                a.*,

                c.nombre AS categoria

            FROM accesorios a

            INNER JOIN categorias c

            ON a.id_categoria=c.id_categoria

            WHERE a.id_categoria=?

            ORDER BY a.nombre`,

            [id]

        );

        res.json(datos);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error del servidor"

        });

    }

});

//==================================================
// BUSCAR ACCESORIOS POR NOMBRE
//==================================================

app.get("/api/accesorios/buscar/:texto", async(req,res)=>{

    try{

        const {texto}=req.params;

        const [datos]=await db.query(

            `SELECT

                a.*,

                c.nombre AS categoria

            FROM accesorios a

            INNER JOIN categorias c

            ON a.id_categoria=c.id_categoria

            WHERE a.nombre LIKE ?

            ORDER BY a.nombre`,

            [`%${texto}%`]

        );

        res.json(datos);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error del servidor"

        });

    }

});

//==================================================
// AGREGAR ACCESORIO
//==================================================

app.post("/api/accesorios", async(req,res)=>{

    try{

        const{

            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            garantia,
            disponible,
            id_categoria

        }=req.body;

        const [resultado]=await db.query(

            `INSERT INTO accesorios(

                nombre,

                descripcion,

                precio,

                stock,

                imagen,

                garantia,

                disponible,

                id_categoria

            )

            VALUES(?,?,?,?,?,?,?,?)`,

            [

                nombre,
                descripcion,
                precio,
                stock,
                imagen,
                garantia,
                disponible,
                id_categoria

            ]

        );

        res.status(201).json({

            success:true,

            mensaje:"Accesorio agregado correctamente",

            id:resultado.insertId

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error al agregar accesorio"

        });

    }

});

//==================================================
// ACTUALIZAR ACCESORIO
//==================================================

app.put("/api/accesorios/:id", async(req,res)=>{

    try{

        const{id}=req.params;

        const{

            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            garantia,
            disponible,
            id_categoria

        }=req.body;

        await db.query(

            `UPDATE accesorios SET

                nombre=?,

                descripcion=?,

                precio=?,

                stock=?,

                imagen=?,

                garantia=?,

                disponible=?,

                id_categoria=?

            WHERE id_accesorio=?`,

            [

                nombre,
                descripcion,
                precio,
                stock,
                imagen,
                garantia,
                disponible,
                id_categoria,
                id

            ]

        );

        res.json({

            success:true,

            mensaje:"Accesorio actualizado correctamente"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error al actualizar"

        });

    }

});

//==================================================
// ELIMINAR ACCESORIO
//==================================================

app.delete("/api/accesorios/:id", async(req,res)=>{

    try{

        const{id}=req.params;

        await db.query(

            "DELETE FROM accesorios WHERE id_accesorio=?",

            [id]

        );

        res.json({

            success:true,

            mensaje:"Accesorio eliminado correctamente"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error al eliminar"

        });

    }

});
//==================================================
// COMPATIBILIDAD DE REFACCIONES
//==================================================

// Obtener los modelos compatibles de una refacción

app.get("/api/compatibilidad/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [datos] = await db.query(

            `SELECT

                c.id_compatibilidad,

                m.id_modelo,

                m.marca,

                m.modelo,

                m.anio

            FROM compatibilidad_refacciones c

            INNER JOIN modelos_motocicleta m

            ON c.id_modelo = m.id_modelo

            WHERE c.id_refaccion = ?

            ORDER BY m.modelo,m.anio`,

            [id]

        );

        res.json(datos);

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error del servidor"

        });

    }

});

//==================================================
// AGREGAR COMPATIBILIDAD
//==================================================

app.post("/api/compatibilidad", async(req,res)=>{

    try{

        const{

            id_refaccion,

            id_modelo

        }=req.body;

        const[resultado]=await db.query(

            `INSERT INTO compatibilidad_refacciones

            (

                id_refaccion,

                id_modelo

            )

            VALUES(?,?)`,

            [

                id_refaccion,

                id_modelo

            ]

        );

        res.status(201).json({

            success:true,

            mensaje:"Compatibilidad agregada",

            id:resultado.insertId

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error al agregar compatibilidad"

        });

    }

});

//==================================================
// ELIMINAR COMPATIBILIDAD
//==================================================

app.delete("/api/compatibilidad/:id", async(req,res)=>{

    try{

        const{id}=req.params;

        await db.query(

            "DELETE FROM compatibilidad_refacciones WHERE id_compatibilidad=?",

            [id]

        );

        res.json({

            success:true,

            mensaje:"Compatibilidad eliminada"

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            mensaje:"Error al eliminar compatibilidad"

        });

    }

});

//==================================================
// OBTENER TODOS LOS USUARIOS
//==================================================

app.get("/api/usuarios", async (req, res) => {

    try {

        const [datos] = await db.query(

            `SELECT
                id_usuario,
                nombre,
                correo,
                rol
            FROM usuarios
            ORDER BY nombre`

        );

        res.json(datos);

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            mensaje: "Error al obtener usuarios"

        });

    }

});

//==================================================
// ELIMINAR USUARIO
//==================================================

app.delete("/api/usuarios/:id", async (req, res) => {

    try {

        const { id } = req.params;

        const [resultado] = await db.query(

            "DELETE FROM usuarios WHERE id_usuario = ?",

            [id]

        );

        if (resultado.affectedRows === 0) {

            return res.status(404).json({

                success: false,
                mensaje: "Usuario no encontrado"

            });

        }

        res.json({

            success: true,
            mensaje: "Trabajador despedido correctamente"

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            mensaje: "Error al eliminar usuario"

        });

    }

});

//==================================================
// CREAR USUARIO
//==================================================

app.post("/api/usuarios", async (req, res) => {

    try {

        const {

            nombre,
            correo,
            contraseña,
            rol

        } = req.body;

        const [existe] = await db.query(

            "SELECT id_usuario FROM usuarios WHERE correo = ?",

            [correo]

        );

        if (existe.length > 0) {

            return res.status(400).json({

                success: false,

                mensaje: "El correo ya existe"

            });

        }

        const [resultado] = await db.query(

            `INSERT INTO usuarios
            (
                nombre,
                correo,
                contraseña,
                rol
            )
            VALUES (?,?,?,?)`,

            [

                nombre,
                correo,
                contraseña,
                rol

            ]

        );

        res.status(201).json({

            success: true,

            mensaje: "Usuario creado correctamente",
            id: resultado.insertId

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            mensaje: "Error al crear usuario"

        });

    }

});

//==================================================
// RUTA PRINCIPAL
//==================================================

app.get("/",(req,res)=>{

    res.json({

        servidor:"API Refaccionaria",

        estado:"Funcionando correctamente"

    });

});

//==================================================
// INICIAR SERVIDOR
//==================================================

const PORT=process.env.PORT || 3001;

app.listen(PORT,()=>{

    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);

});