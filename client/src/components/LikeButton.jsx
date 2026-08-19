// import { useState } from "react";
// function LikeButton(){
//     const[likes,setLikes] = useState(0);
//     const[liked,setLiked] = useState(false);
    

//     function Like(){
        
//         if(!liked){
//             setLiked(true);
//             setLikes(likes + 1);
//         }else{
//             setLiked(false);
//             setLikes(likes - 1);
//         }
//     }
    
//     return(
//         <div>
            
//             <h2>{liked ? "❤️ Liked" : "🤍 Not Liked"}</h2>
//             <h3>Likes : {likes}</h3>

//             <button onClick={Like}> {liked ? "Unlike" : "Like"}</button>
//         </div>
//     )
// }
// export default LikeButton;