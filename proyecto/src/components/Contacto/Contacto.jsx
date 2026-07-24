import styles from "./Contacto.module.css";

function Contacto() {

  return (

    <section className={styles.contacto}>

      <div className={styles.mapa}>

        <iframe
          title="Mapa Magu Centro"
          src="https://www.google.com/maps?q=Magu+Centro,+Nicolás+Romero,+Estado+de+México&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

      </div>

      <div className={styles.informacion}>

        <h2>Información</h2>

        <div className={styles.infoCard}>

          <h3>📞 Teléfono</h3>

          <p>+52 55 1234 5678</p>

        </div>

        <div className={styles.infoCard}>

          <h3>📧 Correo</h3>

          <p>ventas@refaccionesitalika.com</p>

        </div>

        <div className={styles.infoCard}>

          <h3>🕒 Horario</h3>

          <p>Lunes a Sábado</p>

          <p>9:00 AM - 7:00 PM</p>

        </div>

      </div>

    </section>

  );

}

export default Contacto;