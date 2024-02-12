import { useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
} from "@nextui-org/react";
import Image from "next/image";

const CustomNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: "Home", route: "/" },
        { name: "My List", route: "/my-list" },
    ];

    return (
        <Navbar
            className="bg-transparent absolute [&>header]:px-0 [&>header]:max-w-none"
            onMenuOpenChange={setIsMenuOpen}
            isBlurred={true}
        >
            <div className="container mx-auto flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between">
                <div className="flex flex-row items-center gap-20">
                    <NavbarContent>
                        <NavbarMenuToggle
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            className="sm:hidden"
                        />
                        <NavbarBrand>
                            <Link href="/">
                                <Image
                                    src="/static/images/icon.png"
                                    width={180}
                                    height={34}
                                    alt="Netflix Logo"
                                />
                            </Link>
                        </NavbarBrand>
                    </NavbarContent>

                    <NavbarContent
                        className="hidden sm:flex gap-4"
                        justify="between"
                    >
                        {menuItems.map(({ name, route }, i) => (
                            <NavbarItem key={`${name}-${i}`}>
                                <Link
                                    className="text-xl text-white"
                                    href={route}
                                >
                                    {name}
                                </Link>
                            </NavbarItem>
                        ))}
                    </NavbarContent>
                </div>

                <NavbarContent justify="end">
                    {/* <NavbarItem className="hidden lg:flex">
                <Link href="/" color="foreground">Login</Link>
            </NavbarItem> */}
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="primary"
                                name="John Doe"
                                size="sm"
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                        >
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">
                                    test@example.com
                                </p>
                            </DropdownItem>
                            <DropdownItem key="settings">
                                My Settings
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </div>
            <NavbarMenu className="bg-gray-600/30">
                {menuItems.map(({ name, route }, i) => (
                    <NavbarMenuItem key={`${name}-${i}`}>
                        <Link
                            color={
                                i === 2
                                    ? "primary"
                                    : i === menuItems.length - 1
                                    ? "danger"
                                    : "foreground"
                            }
                            className="w-full"
                            href={route}
                            size="lg"
                        >
                            {name}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default CustomNavbar;
