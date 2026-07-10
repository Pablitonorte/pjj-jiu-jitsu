// --------------------------
// 🔧 CONFIGURAÇÃO DO FIREBASE
// --------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAwbIaioYPlQsHEz2bNh5ATi3cGicu12bw",
  authDomain: "pjj-para-jiu-jitsu.firebaseapp.com",
  projectId: "pjj-para-jiu-jitsu",
  storageBucket: "pjj-para-jiu-jitsu.firebasestorage.app",
  messagingSenderId: "72563195814",
  appId: "1:72563195814:web:5bc90e7bc0c51f415c1967",
  measurementId: "G-S5K8S7GMS6"
};

// Inicializa o Firebase (compatível com a versão que você usa)
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --------------------------
// 🔐 LÓGICA DE LOGIN
// --------------------------
document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value.trim();
    const erro = document.getElementById('erroLogin');

    // Tenta fazer login com e-mail e senha cadastrados no Firebase
    auth.signInWithEmailAndPassword(email, senha)
        .then(async (userCredential) => {
            const usuario = userCredential.user;

            // Busca os dados do usuário no banco para ver o tipo (admin/aluno)
            const doc = await db.collection("usuarios").doc(usuario.uid).get();

            if (doc.exists) {
                const dados = doc.data();

                if (dados.tipo === "admin") {
                    alert("🔐 Acesso Permitido! Entrando no PAINEL ADMINISTRATIVO...");
                    window.location.href = "admin.html";
                } else if (dados.tipo === "aluno") {
                    alert("✅ Bem-vindo! Entrando na Área do Aluno...");
                    window.location.href = "aluno.html";
                } else {
                    alert("⚠️ Tipo de usuário não definido.");
                }
            } else {
                alert("❌ Usuário não encontrado no cadastro.");
            }
        })
        .catch((error) => {
            // Se der erro, mostra mensagem
            erro.style.display = 'block';
            erro.textContent = "❌ E-mail ou senha incorretos!";
            setTimeout(() => {
                erro.style.display = 'none';
            }, 3000);
        });
});