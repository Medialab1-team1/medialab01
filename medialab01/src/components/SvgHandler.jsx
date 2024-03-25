//svg imports
import { MenuIcon } from "../assets/MenuIcon";
import { UploadIcon } from "../assets/UploadIcon";

export default function SvgHandler({name, color}){
//map of svg's with usable names on the left
    const svgMap = {
    menu : MenuIcon,
    upload : UploadIcon,
}

const SvgSelected = svgMap[name]
return <SvgSelected color = { color }/>
}