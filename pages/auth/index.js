import CustomNavbar from "@/components/navbar/navbar.component";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (value) =>
        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isEmailInvalid = useMemo(() => {
        if (email === "") return false;

        return validateEmail(email) ? false : true;
    }, [email]);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (email) {
            router.push("/");
        }
    };

    return (
        <div
            className="h-screen"
            style={{
                background:
                    "linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)), url('./static/images/auth-cover.jpg')",
            }}
        >
            <CustomNavbar />

            <Card className="bg-black/65 absolute w-3/12 top-2/4 left-2/4 right-2/4 transform -translate-y-1/2 -translate-x-1/2">
                <CardBody className="flex flex-col p-14 gap-8">
                    <h1 className="text-white text-4xl text-center">Sign In</h1>
                    <form
                        action=""
                        onSubmit={formSubmitHandler}
                        className="flex flex-col gap-5"
                    >
                        <Input
                            className="rounded-md"
                            radius="sm"
                            type="email"
                            label="Email"
                            color={isEmailInvalid ? "danger" : "default"}
                            errorMessage={
                                isEmailInvalid && "Please enter a valid email"
                            }
                            value={email}
                            isInvalid={isEmailInvalid}
                            onValueChange={setEmail}
                        />
                        <Button
                            className="bg-primaryColor text-white text-md py-6 rounded-md"
                            type="submit"
                            isDisabled={isEmailInvalid || email === ""}
                            isLoading={loading}
                        >
                            Sign In
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Auth;
