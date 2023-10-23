// LoadingAnimation.js
import { Player } from "@lottiefiles/react-lottie-player";
import loading from "@/public/loading.json";

export default function LoadingOrdersAnimation() {
    return (
        <div className="flex items-center justify-center mt-6">
            <Player autoplay loop src={loading} style={{ width: "150px", height: "150px" }}></Player>
        </div>
    );
}
