import { Button } from "@nextui-org/react";
import { PlayIcon } from "@heroicons/react/24/solid";

const Banner = (props) => {
    const { title, subTitle, imgUrl } = props;

    return (
        <div
            className="flex items-center bg-center bg-no-repeat bg-cover h-5/6-full"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1621955964441-c173e01c135b?q=80&w=886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
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
