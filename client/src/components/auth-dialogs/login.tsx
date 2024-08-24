import React, { useState } from "react";
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
import { useLogin } from "../../lib/api/api-module";
import { LoginRequest, LoginResponse } from "../../interfaces/auth";
import { setToken } from "../../lib/api/auth";
import { useAuthContext } from "../../lib/context/auth-context";

const LoginDialog: React.FC = () => {

    const { setIsLoggedin, setUserdetails } = useAuthContext();

    const [open, setOpen] = React.useState(false);

    const [formData, setFormData] = useState({ 
        username: "", 
        password: "" 
    } as LoginRequest);

    const successHandler = (data: LoginResponse) => {
        setUserdetails(data);
        setToken(data.access_token);
        setIsLoggedin(true);
        setOpen(false);
    };

    const errorHandler = (error: any) => {
        console.error("Login failed", error);
    };

    const loginMutation = useLogin(successHandler, errorHandler);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loginMutation.isPending) {
            try {
                await loginMutation.mutateAsync(formData);
            } catch (error) {
                console.error("Login failed", error);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-accent-foreground">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[540px] py-[48px] px-[72px] flex flex-col gap-8 ">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-medium">Login to your account</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col justify-start items-start gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <div className="flex flex-col justify-start items-start gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <div className="w-full flex flex-col items-end gap-4">
                            <Button className="w-full" type="submit" disabled={loginMutation.isPending}>
                                {loginMutation.isPending ? "Logging in..." : "Log In"}
                            </Button>
                            <p className="text-sm text-[#98A2B3]">
                                Don't have an account? <span className="text-accent-foreground">Sign Up</span>
                            </p>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;