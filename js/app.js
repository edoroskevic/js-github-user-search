/*
	@author edoroskevic
	@date 29/06/2018
	@description an app to perform GitHub user look-up via GitHub API. this project demonstrates
				 usage of Bootstrap, Fetch API, ECMAScript 2016 Promises, ASYNC and AWAIT sugar,
				 as well as basic DOM manipulation via JavaScript
	@dependencies
		gui.js github.js
*/

let ui = new UI();
let github = new GitHub();

let user = '';
const uiUserInputField = document.getElementById('user');


/*
	@event keyup
	@description on keyup, send a request quering GitHub users API, if user found - display profile information
				 including latest repositories
*/
uiUserInputField
 .addEventListener(
 	'keyup',
	event => {
		user = uiUserInputField.value;
		
		if(user !== ''){
			github
			.getData(user)
			.then( data => {
				const profile = data.profile;
				const repos = data.repository;

				if(profile.message === undefined){
					ui.displayProfile(profile);
					ui.displayRepository(repos);
				}
				else{
					ui.alert();
					ui.clear();
				}
			});
		}
		else{
			ui.clear();
		}
	});
