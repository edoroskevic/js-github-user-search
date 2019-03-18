/*
	author: edoroskevic
	date: 29/07/2018
*/

class GitHub{
	constructor(){
		this.client_id = '5b8b0b869386617ef458';
		this.client_secret = 'd051e43f46ae17f678b0a42622ed8ef48dff0431';			
		this.api = 'http://api.github.com/users/';
		this.repos_count = 5;
		this.repos_sort = 'created: asc';
	}	

	async getData(user){
		const profile = await this.getUser(user);
		const repository = await this.getRepo(user);

		return {profile, repository};
	}

	async getUser(user){
		self = this;

		const request = self.api + `${user}?client_id=${self.client_id}&client_secret=${self.client_secret}`;
		const response = await fetch(request);

		const profile = await response.json();
		
		return profile; 
	}

	async getRepo(user){  
		self = this;
		
		const request = self.api + `${user}/repos?per_page=${self.repos_count}&sort=${self.repos_sort}&client_id=${self.client_id}&client_secret=${self.client_secret}`;
		const response = await fetch(request);
		
		const repos = await response.json();

		return repos;
	}
}
