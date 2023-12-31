import { useEffect, useState } from "react";
const io = (await import("socket.io-client")).default;
import AddComment from "./addComment";
import CommentTile from "./commentsTile";

interface CommentType{
    _id:string;
    blogId:string;
    text:string;
    user:string;
    replies:[];
}

export default function CommentSection({data}:any){
    const id=data._id;
    const [comments,setComments]=useState<CommentType[]>([]);
    useEffect(()=>{
     const handleCommentData=async()=>{
        const response=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/comments?blogId=${id}`);
        const data=await response.json();
        if(data){
            setComments(data.comments);
        }else{
            console.log('no comments founds');
        }
     }
      handleCommentData();
      
    },[id]);
    return(
        <div>
            <div className="text-xl text-solid p-4">
            Comments
        </div>
        <div className="mb-10">
        <AddComment data={data}></AddComment>
        </div>
        <div>
            {
                [...comments].reverse().map((x,id)=>{
                    return <CommentTile key={id} data={x}></CommentTile>
                })
            }
        </div>
        </div>
        
    );
}