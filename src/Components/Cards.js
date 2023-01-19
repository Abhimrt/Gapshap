import React from 'react'
import { motion } from "framer-motion"
import { cardItems } from "../Data/MainPage"
import { useNavigate } from "react-router-dom";

const Cards = () => {

    const navigate = useNavigate();

    return (

        <>
            <div className="CARD">
                {
                    cardItems.map((item) => {
                        return (
                            
                            <motion.div
                                onClick={()=>navigate(`${item.link}`)}
                                className="innerCard"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: .98 }}
                                key = {item.id}
                            >
                                <h1>{item.title}</h1>
                            </motion.div>
                        )
                    })
                }

            </div>

        </>
    )
}

export default Cards