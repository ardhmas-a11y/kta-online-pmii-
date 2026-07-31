/*==================================================
  KTA ONLINE PMII PACITAN
  SCRIPT.JS FINAL V2.0
===================================================*/

// URL Web App Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzP1H0VR5OqU2BALAJt6z7sGH1FCXQ44-MQixQe3S9E4JC0NhxRQ9O3wfT18bQVMqtNqA/exec";

// Nomor WhatsApp Admin
const ADMIN_WA = "6285124249513";

const form = document.getElementById("formKTA");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        //==============================
        // Ambil Data
        //==============================

        const nama = document.getElementById("nama").value.trim();
        const tempat = document.getElementById("tempat").value.trim();
        const tanggal = document.getElementById("tanggal").value;
        const alamat = document.getElementById("alamat").value.trim();
        const hp = document.getElementById("hp").value.trim();

        const foto = document.getElementById("foto").files[0];
        const sertifikat = document.getElementById("sertifikat").files[0];
        const bukti = document.getElementById("bukti").files[0];

        //==============================
        // Validasi
        //==============================

        if (!nama || !tempat || !tanggal || !alamat || !hp) {

            alert("Silakan lengkapi seluruh biodata.");

            return;

        }

        if (!foto) {

            alert("Pas Foto wajib diupload.");

            return;

        }

        if (!sertifikat) {

            alert("Sertifikat MAPABA wajib diupload.");

            return;

        }

        if (!bukti) {

            alert("Bukti pembayaran wajib diupload.");

            return;

        }

        //==============================
        // Loading
        //==============================

        const tombol = form.querySelector("button[type='submit']");

        tombol.disabled = true;

        tombol.innerHTML = "Mengirim Pendaftaran...";

        //==============================
        // Data
        //==============================

        const formData = new FormData();

        formData.append("nama", nama);
        formData.append("tempat", tempat);
        formData.append("tanggal", tanggal);
        formData.append("alamat", alamat);
        formData.append("hp", hp);

        //==============================
        // Kirim ke Apps Script
        //==============================

        fetch(SCRIPT_URL, {

            method: "POST",

            body: formData

        })

        .then(response => response.json())

        .then(result => {

            if (result.status) {

                alert("✅ Pendaftaran berhasil!\n\nSelanjutnya Anda akan diarahkan ke WhatsApp Admin.");

                //==============================
                // Pesan WhatsApp
                //==============================

                const pesan =
`Assalamu'alaikum Wr. Wb.

Saya telah melakukan pendaftaran KTA Online PMII.

Nama : ${nama}

Tempat/Tanggal Lahir :
${tempat}, ${tanggal}

Nomor HP :
${hp}

Asal Cabang :
PC PMII PACITAN

Mohon dilakukan verifikasi data.

Terima kasih.`;

                window.open(
                    "https://wa.me/" + ADMIN_WA + "?text=" + encodeURIComponent(pesan),
                    "_blank"
                );

                form.reset();

            } else {

                alert("Gagal menyimpan data.");

            }

        })

        .catch(error => {

            console.log(error);

            alert("Terjadi kesalahan koneksi ke server.");

        })

        .finally(() => {

            tombol.disabled = false;

            tombol.innerHTML = "KIRIM PENDAFTARAN";

        });

    });

}
