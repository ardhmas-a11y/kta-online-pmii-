/*=========================================
  KTA ONLINE PMII PACITAN
=========================================*/

// GANTI DENGAN URL WEB APP APPS SCRIPT
const SCRIPT_URL = "PASTE_URL_WEB_APP_DISINI";

// Nomor WhatsApp Admin
const ADMIN_WA = "6285124249513";

const form = document.getElementById("formKTA");

if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

// ================= VALIDASI =================

const nama = document.getElementById("nama").value.trim();
const nik = document.getElementById("nik").value.trim();
const tempat = document.getElementById("tempat").value.trim();
const tanggal = document.getElementById("tanggal").value;
const jk = document.getElementById("jk").value;
const hp = document.getElementById("hp").value.trim();
const alamat = document.getElementById("alamat").value.trim();
const rayon = document.getElementById("rayon").value.trim();
const komisariat = document.getElementById("komisariat").value.trim();

const foto = document.getElementById("foto").files[0];
const mapaba = document.getElementById("sertifikat").files[0];
const bukti = document.getElementById("bukti").files[0];

if(
!nama ||
!nik ||
!tempat ||
!tanggal ||
!jk ||
!hp ||
!alamat ||
!rayon ||
!komisariat
){

alert("Lengkapi seluruh biodata.");

return;

}

if(!foto){

alert("Pas Foto wajib diupload.");

return;

}

if(!mapaba){

alert("Sertifikat MAPABA wajib diupload.");

return;

}

if(!bukti){

alert("Bukti pembayaran wajib diupload.");

return;

}

// ================= LOADING =================

const tombol = document.querySelector("button[type='submit']");

tombol.disabled=true;

tombol.innerHTML="Mengirim Pendaftaran...";

// ================= KIRIM =================

const formData = new FormData();

formData.append("nama",nama);
formData.append("nik",nik);
formData.append("tempat",tempat);
formData.append("tanggal",tanggal);
formData.append("jk",jk);
formData.append("hp",hp);
formData.append("alamat",alamat);
formData.append("rayon",rayon);
formData.append("komisariat",komisariat);
formData.append("cabang","PC PMII PACITAN");

formData.append("foto",foto);
formData.append("sertifikat",mapaba);
formData.append("bukti",bukti);

fetch(SCRIPT_URL,{

method:"POST",

body:formData

})

.then(res=>res.json())

.then(data=>{

// ================= SUKSES =================

alert("✅ Pendaftaran berhasil.\nAnda akan diarahkan ke WhatsApp Admin.");

const pesan=
`Assalamu'alaikum Wr. Wb.

Saya telah melakukan pendaftaran KTA Online PMII.

Nama : ${nama}

NIK : ${nik}

Rayon : ${rayon}

Komisariat : ${komisariat}

Cabang : PC PMII PACITAN

Saya telah mengupload:

✓ Pas Foto
✓ Sertifikat MAPABA
✓ Bukti Pembayaran

Mohon dilakukan verifikasi.

Terima kasih.`;

window.open(

"https://wa.me/"+ADMIN_WA+"?text="+encodeURIComponent(pesan),

"_blank"

);

form.reset();

})

.catch(err=>{

console.log(err);

alert("Terjadi kesalahan saat mengirim data.");

})

.finally(()=>{

tombol.disabled=false;

tombol.innerHTML="KIRIM PENDAFTARAN";

});

});

}
