import { Button } from "@nextui-org/react";
import { PlayIcon } from "@heroicons/react/24/solid";

const Banner = (props) => {
    const { title, subTitle, imgUrl } = props;

    return (
        <div
            className="flex items-center bg-center bg-no-repeat bg-cover h-5/6-full"
            style={{
                backgroundImage: `url('${imgUrl}')`,
            }}
        >
            <div className="container mx-auto flex flex-col items-start gap-5">
                <h1 className="text-white text-6xl font-bold text-">
                    Netflix Series
                </h1>
                <h3 className="text-white text-4xl">{title}</h3>
                <h4 className="text-white text-2xl">{subTitle}</h4>
                <Button className="*:text-gray-800 p-5 text-xl font-bold" size="lg">
                    <PlayIcon className="h-6 w-6" />
                    <span>Play</span>
                </Button>
            </div>
        </div>
    );
};

export default Banner;
