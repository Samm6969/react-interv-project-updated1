//Repolist component
class Repolist extends React.Component {
 render() {
  return(
   <div>
     <h3>Repository Details</h3>
     <button class="button" onClick={this.props.repofun}>Click here</button>
      
     <ul className="repo-list">
       {this.props.repos.map(function(result) {
              return <div>
                      <ul key={result.id} className="list-group-item ">
                      <li className="list-group-item-heading"><h3>{result.name}</h3></li>
                        <li className="list-group-item-text">{result.description}</li>
                        <li className="list-three">{result.url}</li>
                        <li className="list-four">{result.open_issues_count}</li>
                        <li className="list-five">{result.size}</li>
                        <li>{result.stargazers_count}</li>
                        <li>{result.forks_count}</li>
                      </ul>
                     </div>;
            })}
        </ul>
   </div>
  )
 }
}

//Userbadge component
class Userbadge extends React.Component {
constructor(props) {
super(props);
 this.state = {
   user: null,
   repo: []
    };
}

getUser = () => {
 let test = this.refs.name.value;
 fetch(`https://api.github.com/users/${test}`)
   .then(response => response.json())
   .then(data => {
     this.setState({
        user: data
     })
   })     
  }
  
userRepos = () => {
  const test = this.refs.name.value;
  fetch(`https://api.github.com/users/${test}/repos`)
   .then(response => response.json())
   .then(data => {
     this.setState({
        repo: data
     })
   })
} 
 
render() {
return(
 <div className="row">
  <input type='text' placeholder='github username' ref='name' />
  <button class="button" onClick={this.getUser}>Search</button>
 {this.state.user ?
 <div>
  <h3>User Details</h3>
  <ul className="user-list">
       <img
                className='avatar'
                src={this.state.user.avatar_url}
                alt={'avatar for ' + this.state.user.login}
              />
           
    <li>{'Name: ' + this.state.user.name}</li>
    <li>{'Number of Followers: ' + this.state.user.followers}</li>
    <li>{'Following: ' + this.state.user.following}</li>
   </ul>  
  </div> : null}
  <Repolist repos={this.state.repo} repofun={this.userRepos} />
  </div>
 );
}
}

// Search Component
class Search extends React.Component {
 render() {    
    return (
    <div>
      <Userbadge />
    </div>
    );
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('container')
);
