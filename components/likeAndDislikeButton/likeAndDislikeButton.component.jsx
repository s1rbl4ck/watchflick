import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";

export const ACTION_TYPE = {
    LIKE: "like",
    DISLIKE: "dislike",
};

const LikeAndDislikeButton = ({
    actionType = ACTION_TYPE.LIKE,
    isSelected,
    onClick
}) => {
    return (
        <Button
            isIconOnly
            color={
                isSelected
                    ? ACTION_TYPE.LIKE === actionType
                        ? "success"
                        : "danger"
                    : "default"
            }
            variant={"flat"}
            radius="full"
            aria-label={actionType}
            onClick={onClick}
        >
            {ACTION_TYPE.LIKE === actionType ? (
                <HandThumbUpIcon className={`w-6 h-6 text-${isSelected ? "success" : "white"}`} />
            ) : (
                <HandThumbDownIcon className={`w-6 h-6 text-${isSelected ? "danger" : "white"}`} />
            )}
        </Button>
    );
};

export default LikeAndDislikeButton;