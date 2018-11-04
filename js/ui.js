/*
	@author edoroskevic
	@date 29/07/2018
*/

class UI{
	/*
		@name: UI
		@description: a class responsible for rendering the retrieved user profile and its repositories	

		@parameters
			uiProfile: a DOM element to hold user profile information
			uiRepository: a DOM element to hold user repository information

		@methods
			displayProfile: display user profile information
			displayRepository: display user repository information
			clear: clear user profile container
			alert: alert user if no user profile could be found
	*/
	constructor(){
		this.uiProfile = document.getElementById('profile');	
		this.uiRepository = document.getElementById('repos');
	}	

	displayProfile(profile){
		/*
			@type: sync
			@name: displayProfile
			@description: display user profile information
			@args:
				profile - the GitHub API response containing user profile information 
			@return: -
		*/
		self = this;
		
		self.uiProfile.innerHTML = `
			<div class='card card-body mb-3'>
				<div class='row'>
					<div class='col-md-3'>
						<img class='img-fluid mb-2' src='${profile.avatar_url}'>
						<a class='btn btn-primary btn-block mb-3' href='${profile.html_url}' target='_blank'>View Profile</a>
					</div>
					<div class='col-md-9'>
						<span class='badge badge-primary'>Public Repos: ${profile.public_repos}</span>
						<span class='badge badge-secondary'>Public Gists: ${profile.public_gists}</span>
						<span class='badge badge-success'>Followers: ${profile.followers}</span>
						<span class='badge badge-info'>Following: ${profile.following}</span>
						<br><br>
						<ul class='list-group'>
							<li class='list-group-item'>Company: ${profile.company}</li>
							<li class='list-group-item'>Website/Blog: ${profile.blog}</li>
							<li class='list-group-item'>Location: ${profile.location}</li>
							<li class='list-group-item'>Member Since: ${profile.created_at}</li>
						</ul>
					</div>
				</div>
			</div>
		`;	
	}

	displayRepository(repository){
		/*
			@type: sync
			@name: displayRepository
			@description: display users latest repositories
			@args:
				repository - a GitHub API response containing latest users repositories
			@return: -
		*/
		self = this;
		
		let output = '';

		output += `<h3 class='mb-3'> Top 5 User Repositories </h3>`;
		repository.forEach( repo => {
			output += `
				<div class='card card-body mb-2'>
					<div class='row'>
						<div class='col-md-6'>
							<a href='${repo.html_url}' target='_blank'>${repo.name}</a>
						</div>
						<div class='col-md-6'>
							<span class='badge badge-primary'>Stars: ${repo.stargazers_count}</span>
							<span class='badge badge-secondary'>Watchers: ${repo.watchers_count}</span>
							<span class='badge badge-success'>Forks: ${repo.forks_count}</span>
						</div>
					</div>
				</div>		
			`;	
		});

		self.uiRepository.innerHTML = output;	
	}
	
	clear(){
		/*
			@type: sync
			@name: clear
			@description: clear user profile and repository container
			@args: -
			@return: -
		*/
		self = this;
		
		self.uiProfile.innerHTML = '';	
		self.uiRepository.innerHTML = '';
	}

	alert(){
		/*
			@type: sync
			@name: alert
			@description: alert user if no user profile could be found
			@args: -
			@return: -
		*/
		const instance = document.querySelector('.alert');

		if(instance === null){
			const message = 'error! no profile found';

			const popup = document.createElement('div');
			const text = document.createTextNode(message);
			const container = document.querySelector('#search-container');	
			const target = document.querySelector('#search');

			popup.className = 'alert alert-danger';
			popup.appendChild(text);
				
			container.insertBefore(popup, target);	

			setTimeout(() => {
				popup.remove();	
			}, 1000);
		}
	}
}
