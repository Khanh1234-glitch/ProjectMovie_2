import { Global } from "@mantine/core";

export const GlobalStyles = ()=>{
    return (
        <Global
        styles={(theme)=>({
            "*":{
                margin: 0,
                padding: 0,
                boxSizing:"border-box",
                scrollBehavior:"smooth",
            },
            body:{
                fontSize:"16px",
                color: "#333",
            }
        })}
        />
    )
}

