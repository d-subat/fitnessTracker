import React from "react";


const NotFound = (props) => (

  <section>  
  <h4>404</h4>

 <h1>Page not found</h1>

<div className="box notfound">
    <h1><span>404</span></h1>
    <h2>Oops, we're sorry. We can not find the page you're looking for. </h2>
    <hr />
    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable</p>
    <button onClick={props.history.goBack} className="btn" style={{width: "auto"}}>
                        Return home
                    </button> 
    
  </div>
 </section>
)
export default NotFound;