import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AppDispatch } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router";
import axios from "axios";
import { loadUser, loginUserAction } from "@/slice/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const { base_url } = CheckEnvironment();

  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, isLoading } = useSelector(
    (state: { auth: { isAuthenticated: boolean; isLoading: boolean } }) =>
      state.auth
  );

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await axios.post(`http://localhost:5000/api/login`, {
        email,
        password,
      });
      dispatch(loginUserAction(response.data));
      return response.data; // Return response data
    },
    onSuccess: () => {
      alert("Login successful!");
    },
    onError: (error: { response: { data: string } }) => {
      console.error(error?.response.data);
      setError(error?.response.data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    loginMutation.mutate({ email, password });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return isAuthenticated ? (
      <Navigate to={`/`} replace />
    ) : (
      <Navigate to="/" replace />
    );
  }
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login Your Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Button type="submit">Login</Button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
          <div className="mt-4 flex justify-center">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
