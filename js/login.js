document.getElementById('formLogin').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value.trim();

    // ✅ Acesso Administrador
    if (email === "admin@pjj.com.br" && senha === "123456") {
        alert("🔐 Acesso Permitido! Entrando no PAINEL ADMINISTRATIVO...");
        window.location.href = "admin.html";
    }
    
    // ✅ Acesso Aluno
    else if (email === "aluno@pjj.com.br" && senha === "123456") {
        alert("✅ Bem-vindo! Entrando na Área do Aluno...");
        window.location.href = "aluno.html";
    }

    // ❌ Dados incorretos
    else {
        const erro = document.getElementById('erroLogin');
        erro.style.display = 'block';
        setTimeout(() => {
            erro.style.display = 'none';
        }, 3000);
    }
});