document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const photoGallery = document.getElementById('photoGallery');

    // Carregar fotos salvas no localStorage ao carregar a página
    loadPhotos();

    uploadForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir o comportamento padrão do formulário
        
        const files = fileInput.files;
        if (files.length === 0) return;

        // Ler e exibir cada arquivo selecionado
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const imageURL = reader.result;
                addPhoto(imageURL); // Adicionar a foto na galeria
                savePhoto(imageURL); // Salvar a foto no localStorage
            };
            reader.readAsDataURL(file); // Ler o arquivo como uma URL de dados
        });

        fileInput.value = ''; // Limpar o input de arquivos
    });

    // Função para adicionar uma foto na galeria
    function addPhoto(url) {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('photo-thumbnail');
        img.addEventListener('click', () => {
            if (confirm('Deseja remover esta foto?')) {
                removePhoto(url); // Remover a foto do localStorage
                img.remove(); // Remover a foto da galeria
            }
        });
        photoGallery.appendChild(img); // Adicionar a imagem na galeria
    }

    // Função para salvar uma foto no localStorage
    function savePhoto(url) {
        const photos = getSavedPhotos();
        photos.push({ url, timestamp: new Date().toISOString() });
        localStorage.setItem('photos', JSON.stringify(photos));
    }

    // Função para obter as fotos salvas no localStorage
    function getSavedPhotos() {
        const saved = localStorage.getItem('photos');
        return saved ? JSON.parse(saved) : [];
    }

    // Função para carregar as fotos salvas no localStorage
    function loadPhotos() {
        const photos = getSavedPhotos();
        photos.forEach(photo => {
            addPhoto(photo.url);
        });
        removeExpiredPhotos(); // Remover fotos expiradas
    }

    // Função para remover fotos que passaram de 48 horas
    function removeExpiredPhotos() {
        const photos = getSavedPhotos();
        const twoDaysInMillis = 48 * 60 * 60 * 1000;
        const now = new Date().getTime();

        const filteredPhotos = photos.filter(photo => {
            const photoDate = new Date(photo.timestamp).getTime();
            return now - photoDate < twoDaysInMillis;
        });

        localStorage.setItem('photos', JSON.stringify(filteredPhotos));

        // Limpar a galeria e recarregar as fotos válidas
        photoGallery.innerHTML = '';
        filteredPhotos.forEach(photo => {
            addPhoto(photo.url);
        });
    }

    // Executar a remoção de fotos expiradas ao carregar a página
    removeExpiredPhotos();
});
