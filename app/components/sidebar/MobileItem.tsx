"use client";

import Link from "next/link"
import clsx from "clsx";

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const MobileFooter: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick
}) => {
    const handleClick = () => {
        if(onClick) {
            return onClick();
        }
    }

    return ( 
        <Link 
        onClick={onClick}
        href={href}
        className={clsx(`
        group
        flex
        gap-x-3
        text-sm
        leading-6
        font-semibold
        w-full
        justify-center
        p-4
        text-stone-800
        hover:text-black
        hover:stone-500
        `,
        active && "bg-stone-400 text-black"
        )}
        >
            <Icon className="h-6 w-6" />

        </Link>
     );
}
 
export default MobileFooter;