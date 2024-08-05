document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    var campoA = parseFloat(document.getElementById('campoA').value);
    var campoB = parseFloat(document.getElementById('campoB').value);
    
    if (campoB > campoA) {
        exibirMensagem(true, "Formulário válido: B é maior que A.");
    } else {
        exibirMensagem(false, "Formulário inválido: B precisa ser maior que A.");
    }
});

function exibirMensagem(valido, mensagem) {
    var mensagemElemento = document.getElementById('mensagem');
    mensagemElemento.textContent = mensagem;
    
    if (valido) {
        mensagemElemento.classList.remove('invalid');
        mensagemElemento.classList.add('valid');
    } else {
        mensagemElemento.classList.remove('valid');
        mensagemElemento.classList.add('invalid');
    }
    
    mensagemElemento.style.display = 'block';
}