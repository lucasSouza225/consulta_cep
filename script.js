const campoCep = document.getElementById('campoCep');
const btnBuscar = document.getElementById('btnBuscar');
const divErro = document.getElementById('erro');
const divResultado = document.getElementById('resultado');
btnBuscar.addEventListener('click', buscarCep);
campoCep.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') buscarCep();
});
async function buscarCep() {
    divErro.classList.add('oculto');
    divResultado.classList.add('oculto');
    const cep = campoCep.value.replace(/\D/g, '');
    if (cep.length !== 8) {
        mostrarErro('Digite um CEP válido com 8 números!');
        return;
    } try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );
        const dados = await resposta.json();
        if (dados.erro) {
            mostrarErro('CEP não encontrado!');
            return;
        }
        exibirResultado(dados);
    } catch (error) {
        mostrarErro('Erro de conexão. Verifique sua internet.');
    }
}
function exibirResultado(dados) {
    document.getElementById('resCep').textContent = dados.cep;
    document.getElementById('resLogradouro').textContent = dados.logradouro;
    document.getElementById('resBairro').textContent = dados.bairro;
    document.getElementById('resCidade').textContent = dados.localidade;
    document.getElementById('resEstado').textContent = dados.uf;
    divResultado.classList.remove('oculto');
}
function mostrarErro(mensagem) {
    divErro.textContent = mensagem;
    divErro.classList.remove('oculto');
}