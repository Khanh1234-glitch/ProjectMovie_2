import { Box } from "@mantine/core"
import { Outlet } from "react-router-dom"
import Carousel from "../Components/Carousel"
import Header from "../Components/Header"


const CheckoutTemplate = () => {
  return (
    <Box
    sx={{
        display:"flex",
        flexDirection:"column",
        minHeight:"100vh",
    }}
    >
        {/* Header */}
        <Header></Header>
        {/* Body */}

        <Box sx={{flex:1}}>
            <Outlet/>
        </Box>

    </Box>
  )
}

export default CheckoutTemplate