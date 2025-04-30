'use client'

import { usePathname } from "next/navigation"
import { Link, Typography } from "@mui/material";
import * as NextLink from "next/link";

export function Breadcrumbs(){

const path = usePathname().split('/').filter(segment => segment)

function styling(index: Number) {
    const style = index == path.length - 1 ? {color:'black'} : {color:'gray'}
    return ({
        ...style,
    });
}


return(
    <div style={{display:'flex', flexDirection:'row', margin:'10px', gap:'3px'}} >
        <Typography>
            {path.length == 0 ? '' : (<Link href={".."} component={NextLink.default} underline="hover" sx={styling(path.indexOf(''))}>
                {"Home "}
            </Link>)}
         </Typography>
        {path.filter(function(obj) { return path.indexOf(obj) != path.length - 1}).map((segment, i) => (
            <Typography>
                <Link href={('../').repeat(path.length - i - 1) + segment}
                component={NextLink.default} 
                underline='hover' 
                
                sx={styling(i)}>
                   {'/ ' + segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
            </Typography>
        ))}
        <Typography>
            {path.length > 0 ? '/ ' + path[path.length - 1].charAt(0).toUpperCase() + path[path.length - 1].slice(1) : ''}
        </Typography>
    </div>

);
}