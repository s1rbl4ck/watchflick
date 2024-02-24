import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, Skeleton, card } from "@nextui-org/react";
import cls from "classnames";
import Image from "next/image";

export const CARD_ORIENTATION = {
    LANDSCAPE: "landscape",
    PORTRAIT: "portrait",
}

const CARD_OPTIONS = {
    landscape: {
        width: "1280",
        height: "720",
        cardStyle: "w-64 lg:w-80"
    },
    portrait: {
        width: "720",
        height: "1280",
        cardStyle: "h-80 lg:h-96 w-44 lg:w-56"
    }
};

const CustomCard = ({id, item, itemsCount, orientation = CARD_ORIENTATION.LANDSCAPE, className }) => {
    const { title, desc, slug = "", image } = item;
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const hoverScale =
        id === 0
            ? { scaleY: 1.1 }
            : itemsCount - 1 === id
            ? { scaleY: 1.1 }
            : { scale: 1.1 };

    return (
        <motion.a
            className={cls(`flex-1`, className)}
            whileHover={hoverScale}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            href={`/${slug}`}
        >
            <Card className={`group ${CARD_OPTIONS[orientation].cardStyle} hover:image:opacity-80`}>
                <CardHeader className="absolute z-10 flex-col !items-start">
                    {title && (
                        <h4 className="text-white font-medium text-md line-clamp-2">
                            {title}
                        </h4>
                    )}
                    {desc && (
                        <p className="text-tiny text-white/60 uppercase font-bold">
                            {desc}
                        </p>
                    )}
                </CardHeader>
                {!imageError ? (
                    <div className="bg-black h-full">
                        <Image
                            className={`w-full h-full object-cover aspect-video transition duration-300 ease-in-out group-hover:opacity-55`}
                            src={image}
                            width={CARD_OPTIONS[orientation]?.width}
                            height={CARD_OPTIONS[orientation]?.height}
                            alt="Card background"
                            onError={() => handleImageError}
                        />
                    </div>
                ) : (
                    <div className="h-full">
                        <Skeleton className="h-full">
                            <div className="bg-default-300"></div>
                        </Skeleton>
                    </div>
                )}
            </Card>
        </motion.a>
    );
};

export default CustomCard;
