import useEmblaCarousel from "embla-carousel-react";
import CustomCard from "../card/card.component";
import Link from "next/link";

const SectionCard = ({
    title,
    items,
    orientation,
    videoId,
    isSlider = true,
}) => {
    const OPTIONS = { dragFree: true, containScroll: "trimSnaps" };
    const [emblaRef] = useEmblaCarousel(OPTIONS);

    if (items.length === 0) return null;

    return (
        <section className="container mx-auto my-10 flex flex-col gap-1">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">{title}</h2>
            {isSlider ? (
                <div className="flex flex-row gap-8">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex touch-pan-y gap-6 py-8">
                            {items.map((item, i) => (
                                <Link href={`/video/${videoId}`}>
                                    <CustomCard
                                        key={i}
                                        id={i}
                                        item={item}
                                        itemsCount={items.length}
                                        orientation={orientation}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 justify-start gap-8">
                    {items.map((item, i) => (
                        <Link href={`/video/${videoId}`}>
                            <CustomCard
                                key={i}
                                id={i}
                                item={item}
                                itemsCount={items.length}
                                orientation={orientation}
                                size={!isSlider && 'w-full lg:w-full'}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SectionCard;
