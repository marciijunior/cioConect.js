const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader(); // Cria um novo leitor de arquivo
        leitor.onload = () => { // Quando o arquivo for carregado, resolve a promessa com a URL e o nome do arquivo.
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => { // Se ocorrer um erro ao ler o arquivo, rejeita a promessa com uma mensagem de erro.
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo) // Lê o arquivo como uma URL de dados
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => { // Adiciona um listener para o evento de mudança no input de upload.
    const arquivo = evento.target.files[0]; // Pega o primeiro arquivo selecionado.

    if (arquivo) { // Verifica se um arquivo foi selecionado.
        try { // Tenta ler o conteúdo do arquivo.
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo); // Espera a promessa ser resolvida.
            imagemPrincipal.src = conteudoDoArquivo.url; // Define a URL da imagem principal.
            nomeDaImagem.textContent = conteudoDoArquivo.nome; // Define o nome da imagem.
        } catch (erro) { // Se ocorrer um erro ao ler o arquivo, exibe uma mensagem de erro.
            console.error("Erro na leitura do arquivo") // Imprime o erro no console.
        }
    }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

inputTags.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
            listaTags.appendChild(tagNova);
            inputTags.value = "";
        }
    }
})
