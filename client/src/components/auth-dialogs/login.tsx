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
import { useAuthContext } from "../../lib/context/auth-context";

const LoginDialog: React.FC = () => {
    const { 
        isLoginDialogOpen, 
        setIsLoginDialogOpen, 
        setIsSignupDialogOpen,
        loginMutation,
        formData,
        setFormData
    } = useAuthContext();

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
        <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
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
                                Don't have an account? <span onClick={() => {
                                    setIsSignupDialogOpen(true)
                                    setIsLoginDialogOpen(false)
                                    }} className="text-accent-foreground cursor-pointer">Sign Up</span>
                            </p>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;