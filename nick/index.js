<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	 <link rel="icon" href="https://itana.pw/image/icon.svg">
    <title>Free Nicks</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; }
        input { margin: 10px; padding: 5px; width: 200px; }
        ul { list-style-type: none; padding: 0; }
        li { padding: 5px; }
    </style>
</head>
<body>
    <h2>Поиск слитых ников</h2>
    <input type="text" id="search" placeholder="Введите логин">
    <ul id="results"></ul>
    
    <script>
        let users = {};
        let searchInput = document.getElementById('search');
        let resultsList = document.getElementById('results');
        
        async function loadUsers() {
            try {
                let response = await fetch('users.txt');
                let data = await response.text();
                data.split('\n').forEach(line => {
                    let parts = line.trim().split(':');
                    if (parts.length === 2) {
                        users[parts[0].trim()] = parts[1].trim();
                    }
                });
            } catch (error) {
                console.error('Ошибка загрузки файла:', error);
            }
        }
        
        function searchUser() {
            let query = searchInput.value.trim().toLowerCase();
            resultsList.innerHTML = '';
            if (query.length === 0 || Object.keys(users).length === 0) return;
            
            Object.keys(users).forEach(login => {
                if (login.toLowerCase().includes(query)) {
                    let li = document.createElement('li');
                    li.textContent = `${login}: ${users[login]}`;
                    resultsList.appendChild(li);
                }
            });
        }
        
        searchInput.addEventListener('input', searchUser);
        
        loadUsers();
    </script>
</body>
</html>
