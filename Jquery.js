document.addEventListener('DOMContentLoaded', () => {
    const chooseFileButton = document.getElementById('chooseFileButton');
    const fileInput = document.getElementById('fileInput');
    const qrCodeButton = document.getElementById('qrCodeButton');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const photoGallery = document.getElementById('photoGallery');

    // Inicializar a galeria de fotos ao carregar a página
    loadPhotos();

    // Evento para abrir o seletor de arquivos
    chooseFileButton.addEventListener('click', () => {
        fileInput.click();
    });

    // Evento para manipular o upload de arquivos
    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length === 0) return;

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const imageURL = reader.result;
                addPhoto(imageURL);
                savePhoto(imageURL);
            };
            reader.readAsDataURL(file);
        });

        fileInput.value = ''; // Limpar o input de arquivos
    });

    // Evento para gerar o QR code
    qrCodeButton.addEventListener('click', () => {
        qrCodeContainer.style.display = 'block';

        // Gerar QR code para a mesma página (simulando o upload via câmera)
        const url = window.location.href;
        new QRCode(document.getElementById("qrCode"), {
            text: url,
            width: 200,
            height: 200
        });
    });

    // Função para adicionar uma foto na galeria
    function addPhoto(url, dateInfo = null) {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('photo-container');

        const img = document.createElement('img');
        img.src = url;
        img.classList.add('photo-thumbnail');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.classList.add('remove-button');

        removeButton.addEventListener('click', () => {
            if (confirm('Deseja remover esta foto?')) {
                removePhoto(url);
                imgContainer.remove();
            }
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(removeButton);

        // Adicionar data e dia da semana
        const dateDisplay = document.createElement('p');
        dateDisplay.textContent = dateInfo ? dateInfo : getFormattedDate(new Date());
        imgContainer.appendChild(dateDisplay);

        photoGallery.appendChild(imgContainer);
    }

    // Função para salvar uma foto no localStorage
    function savePhoto(url) {
        const photos = getSavedPhotos();
        photos.push({ url, timestamp: new Date().toISOString() });
        localStorage.setItem('photos', JSON.stringify(photos));
    }

    // Função para carregar fotos do localStorage
    function loadPhotos() {
        const photos = getSavedPhotos();
        photos.forEach(photo => {
            addPhoto(photo.url, getFormattedDate(new Date(photo.timestamp)));
        });
        removeExpiredPhotos();
    }

    // Função para obter as fotos salvas no localStorage
    function getSavedPhotos() {
        const saved = localStorage.getItem('photos');
        return saved ? JSON.parse(saved) : [];
    }

    // Função para remover fotos expiradas
    function removeExpiredPhotos() {
        const photos = getSavedPhotos();
        const threeDaysInMillis = 72 * 60 * 60 * 1000; // 72 horas em milissegundos
        const now = new Date().getTime();

        const filteredPhotos = photos.filter(photo => {
            const photoDate = new Date(photo.timestamp).getTime();
            return now - photoDate < threeDaysInMillis;
        });

        localStorage.setItem('photos', JSON.stringify(filteredPhotos));

        // Limpar a galeria e recarregar as fotos válidas
        photoGallery.innerHTML = '';
        filteredPhotos.forEach(photo => {
            addPhoto(photo.url, getFormattedDate(new Date(photo.timestamp)));
        });
    }

    // Função para remover uma foto específica do localStorage
    function removePhoto(url) {
        let photos = getSavedPhotos();
        photos = photos.filter(photo => photo.url !== url);
        localStorage.setItem('photos', JSON.stringify(photos));
    }

    // Função para obter data formatada com dia da semana e data
    function getFormattedDate(date) {
        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const day = daysOfWeek[date.getDay()];
        const formattedDate = `${day}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
    }

    // Remover fotos expiradas ao carregar a página
    removeExpiredPhotos();
});
