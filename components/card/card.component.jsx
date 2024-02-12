import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, Skeleton } from "@nextui-org/react";
import cls from "classnames";
import Image from "next/image";
import Link from "next/link";

const CustomCard = ({ item, itemsCount, size = "sm", className }) => {
    const { id, title, desc, slug = "", image } = item;
    const [imageError, setImageError] = useState(false);

    const cardSizes = {
        sm: "",
        md: "",
        lg: "",
    };

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
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            href={`/${slug}`}
        >
            <Card className={`h-full ${cardSizes[size]}`}>
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                    {title && (
                        <h4 className="text-white font-medium text-xl">
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
                    <Image
                        className="z-0 w-full h-full object-cover"
                        src={image}
                        width={720}
                        height={480}
                        alt="Card background"
                        onError={() => handleImageError}
                    />
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
