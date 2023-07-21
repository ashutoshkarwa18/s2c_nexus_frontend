import React, { useState } from "react";

function Response(props){

    return(
        <div class="m-4 border-gray-300 border-2 rounded-md">
        <p class="text-md font-bold mx-4 my-2">{props.data.username}</p>
        <p class="text-sm mx-4 my-2">{props.data.reply}</p>
        {/* <div class="flex justify-end mr-8 ">
            <div>{props.data.createdAt.slice(0,10)}</div>
        </div> */}
        </div>
    );
}
export default Response;