import Lottie from "lottie-react";
import Prize from '../assets/prize.json';

const Welcome = () => {
  return (
    <Lottie animationData={Prize} loop={true} className="lg:w-96 md:w-72 w-64" />
    
  )
}

export default Welcome;
