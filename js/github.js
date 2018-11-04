/*
	@author edoroskevic
	@date 29/07/2018
*/

class GitHub{
/*
	@name: GitHub
	@description: a class responsible for carrying out the communication with the GitHub API
	
	@parameters
		client_id: a GitHub client id 
		client_secret: a GitHub client secret	
		api: a GitHub API
		repos_count: a number of repositories associated with the user account to be retrieved
		repos_sort: sorting to apply when retrieving the repository list

	@methods
		getData: return user profile and user repositories
		getUser: return user profile
		getRepos: return user repositories
*/
	constructor(){
		this.client_id = '5b8b0b869386617ef458';
		this.client_secret = 'd051e43f46ae17f678b0a42622ed8ef48dff0431';			
		this.api = 'http://api.github.com/users/';
		this.repos_count = 5;
		this.repos_sort = 'created: asc';
	}	

	async getData(user){
		/*
			@type: async
			@name: getData
			@description: return both user profile and latest repositories
			@args:
				(string) user - a user parameter to use when querying the GitHub API
			@return:
				an object containing both user profile and user repositories
		*/
		const profile = await this.getUser(user);
		const repository = await this.getRepo(user);

		return {profile, repository};
	}

	async getUser(user){
		/*
			@type: async
			@name: getData
			@description: return user profile
			@args:
				(string) user - a user parameter to use when querying the GitHub user API
			@return:
				an object containing user profile information	
		*/
		self = this;

		const request = self.api + `${user}?client_id=${self.client_id}&client_secret=${self.client_secret}`;
		const response = await fetch(request);

		const profile = await response.json();
		
		return profile; 
	}

	async getRepo(user){  
		/*
			@type: async
			@name: getRepo
			@description: return user repositories
			@args:
				(string) user - a user parameter to use when querying the GitHub user API
			@return:
				an object containing user latest repository information
		*/
		self = this;
		
		const request = self.api + `${user}/repos?per_page=${self.repos_count}&sort=${self.repos_sort}&client_id=${self.client_id}&client_secret=${self.client_secret}`;
		const response = await fetch(request);
		
		const repos = await response.json();

		return repos;
	}
}
