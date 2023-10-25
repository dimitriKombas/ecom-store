import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import order from "@/public/order.json";

export default function OrderAnimation() {
    return (
        <div className="flex flex-col items-center justify-center mt-6 sm:mt-12 p-12">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center mb-6"
            >
                Prepping your order ✨
            </motion.h1>
            <Player
                autoplay
                loop
                src={order}
                style={{ width: "350px", height: "350px" }}
            ></Player>
        </div>
    );
}
