document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    githubForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
      if (searchTerm === '') return;
  
      try {
        const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
  
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userData = await usersResponse.json();
        displayUsers(userData.items);
      } catch (error) {
        console.error(error);
      }
    });
  
    async function displayUsers(users) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button onclick="showUserRepos('${user.login}')">Show Repos</button>
        `;
        userList.appendChild(userItem);
      });
    }
  
    async function showUserRepos(username) {
      try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
  
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch repository data');
        }
  
        const reposData = await reposResponse.json();
        displayRepos(reposData);
      } catch (error) {
        console.error(error);
      }
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.textContent = repo.name;
        reposList.appendChild(repoItem);
      });
    }
  });