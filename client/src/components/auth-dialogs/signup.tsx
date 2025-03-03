import React from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { SignupReq } from "../../interfaces/auth";
import { useSignup } from "../../lib/api/api-module";
import { useToast } from "../ui/toast/use-toast";
import { useAuthContext } from "../../lib/context/auth-context";

const SignupDialog: React.FC = () => {
    const { toast } = useToast();
    const { 
        isSignupDialogOpen, 
        setIsSignupDialogOpen, 
        setIsLoginDialogOpen,
        loginMutation,
        setFormData: setLoginFormData
    } = useAuthContext();

    const [formData, setFormData] = React.useState<SignupReq>({
        email: "",
        username: "",
        password: "",
    });

    const successHandler = async (data: any) => {
        try {
            setLoginFormData({
                username: formData.username,
                password: formData.password
            });
            await loginMutation.mutateAsync({
                username: formData.username,
                password: formData.password
            });
            toast({
                title: "Signup and login successful",
                description: "Your account has been created and you're now logged in",
                variant: "default",
            });
        } catch (error) {
            console.error("Auto-login after signup failed:", error);
            toast({
                title: "Signup successful, but login failed",
                description: "Please try logging in manually",
                variant: "default",
            });
            setIsSignupDialogOpen(false);
        }
    }

    const errorHandler = (error: any) => {
        toast({
            title: "Signup failed",
            description: error.message,
            variant: "destructive",
        });
    }

    const signupMutation = useSignup(successHandler, errorHandler);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signupMutation.isPending) {
            try {
                await signupMutation.mutateAsync(formData);
            } catch (error) {
                console.error("Signup error:", error);
            }
        }
    };

    return (
        <Dialog open={isSignupDialogOpen} onOpenChange={setIsSignupDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-accent-foreground">Sign Up</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] py-[48px] px-[72px] flex flex-col gap-8">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-medium">Create an account</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col justify-start items-start gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="flex flex-col justify-start items-start gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="flex flex-col justify-start items-start gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="col-span-3"
                            type="password"
                            required
                        />
                    </div>
                    <DialogFooter>
                        <div className="w-full flex flex-col items-end gap-4">
                            <Button className="w-full" type="submit" disabled={signupMutation.isPending}>
                                {signupMutation.isPending || loginMutation.isPending ? "Signing Up..." : "Sign Up"}
                            </Button>
                            <p className="text-sm text-[#98A2B3]">
                                Already have an account?{" "}
                                <span onClick={() => {
                                    setIsLoginDialogOpen(true)
                                    setIsSignupDialogOpen(false)
                                    }} className="text-accent-foreground cursor-pointer">Log In</span>
                            </p>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default SignupDialog;