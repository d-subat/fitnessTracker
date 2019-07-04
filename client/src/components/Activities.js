import  React ,{Component,useState,useEffect} from 'react';
import axios from 'axios';


const HOST = "http://localhost:4000";  
  const acticityGetUrl = "/api/exercise/users";
  const acticityPostUrl = "/api/exercise/new-user";
  const acticityPatchUrl = "/api/exercise/delete-user";
  const myUrl = HOST + acticityGetUrl;

 
class Activities extends Component { 
  state = {
    users: [],
    newuser: "",
    status: ""
 };
 async componentDidMount() {
    this.getUsers();
 
 }
 getUsers = () => {
    axios
        .get(myUrl)
        .then(data => this.setState({ users: data.data.reverse() }))
        .catch(err => {
            console.log(err);
            return null;
        });
};
newUser = () => {
  //#### STATUS MESSAGE!!!
  if (this.state.newuser.length > 3 ){
    
  const username = this.state.newuser;
  axios
      .post(HOST + acticityPostUrl ,({"username": username}))
      .then(data => (this.getUsers ()))
      .catch(err => {
          console.log(err);
          return null;
      });
    }
    else {
      this.setState({ status: "größer 3" });
    }
};
deleteUser = (id) => {
  //#### STATUS MESSAGE!!!
  
  axios
      .post(HOST + acticityPatchUrl ,({"_id": id}))
      .then(data => {
        this.setState({ status: "Deleted" });
        this.getUsers ();})
      .catch(err => {
          console.log(err);
          return null;
      });
        
  
};
handleMessageInput = (e) => {
  //#### ERROR CHECK auf empty
  if (e.target.value.length > 3 ){
  this.setState({ newuser: e.target.value ,status: ""});}
  else {
    this.setState({ status: "größer 3" });
  }
  
}
   render(){


  return (
    <>
   {this.state.status && <div class="statusMessage"> {this.state.status}</div>}
   <section>  
     <h4>Overview</h4>

    <h1>Edit Activities</h1>
  
     
        <div class="box">
             
                <label htmlFor="selectUser">Name</label>
                <input onChange={this.handleMessageInput}  name="username"   />
                    <button  onClick={() => this.newUser()}>Create Activity</button>
                
                </div>
       
       <div class="container">          
        
       {this.state.users.length === 0 ? (
                   <div>Loading...</div>
               ) : (
                   this.state.users.map((e, i) => {
                       return <div key={i} className="activities">
                       <div className="delete" onClick={() => this.deleteUser(e._id)}>x</div>
                       {e.username}
                       
                       </div>;
                    })
)}  
        
</div>
  </section>
  </>
)
}

}

export default Activities;