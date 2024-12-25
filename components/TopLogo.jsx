import Svg, { Path } from "react-native-svg";
import LogoNinja from '../assets/images/toplogo.png'
import { Image } from "react-native"

export default function TopLogo() {
    return (
        <>
            <Image source={LogoNinja} style={{ width: 190, height: 200, marginBottom: -80 }} />
            <Svg width="100%" height="100" preserveAspectRatio="none"
                viewBox="0 0 393 137" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path d="M0 123.456L393 0V37.5057L0 137L0 123.456Z" fill="#D7E773" />
            </Svg>
        </>
    )
}