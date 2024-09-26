const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-box");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("input-word").value;
    
    // Limpar o resultado anterior
    result.innerHTML = "";

    // Verificar se a entrada não está vazia
    if (!inpWord) {
        result.innerHTML = "<p>Por favor, insira uma palavra.</p>";
        return;
    }

    fetch(`${url}${encodeURIComponent(inpWord)}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Palavra não encontrada');
            }
            return response.json();
        })
        .then((data) => {
            // Exibir os dados na tela
            result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button id="play-sound"><i class='bx bxs-volume-full'></i></button>
                </div>

                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>

                <p class="meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>

                <p class="example">
                    ${data[0].meanings[0].definitions[0].example || ''}
                </p>
            `;


            const playSoundButton = document.getElementById("play-sound");
            playSoundButton.addEventListener("click", () => {
                const audioUrl = data[0].phonetics[0]?.audio; 
                if (audioUrl) {
                    const audio = new Audio(audioUrl);
                    audio.play();
                } else {
                    alert('Nenhum áudio disponível para esta palavra.');
                }
            });
        })
        .catch((error) => {
            result.innerHTML = `<p>${error.message}</p>`;
        });
});
