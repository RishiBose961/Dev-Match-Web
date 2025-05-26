import { loadUser, loginUserAction } from "@/slice/authSlice";
import type { AppDispatch } from "@/store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface PersonalInfoProps {
  handleNext: () => void;
}

const PersonalInfo = ({ handleNext }: PersonalInfoProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const registerMutation = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      const response = await axios.post(`http://localhost:5000/api/register`, {
        name,
        email,
        password,
      });
      dispatch(loginUserAction(response.data));
      return response.data; // Return response data
    },
    onSuccess: () => {
      alert("Register successful!");
      handleNext();
    },
    onError: (error: { response: { data: string } }) => {
      console.error(error?.response.data);
      setError(error?.response.data);
    },
  });

 
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);


  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Trigger the mutation
    registerMutation.mutate({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
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
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Create Personal Info</Button>
      </div>
    </form>
  );
};

export default PersonalInfo;
