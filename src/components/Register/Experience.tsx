import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";



interface PersonalInfoProps {
  handleNext: () => void;
}

const Experience = ({ handleNext }: PersonalInfoProps) => {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [country, setCountry] = useState("");

  const queryClient = useQueryClient();

  const { user } = useSelector(
    (state: { auth: { user: { token: string } | null } }) => state.auth
  );

  const mutation = useMutation({
    mutationFn: async (data: {
      position: string;
      company: string;
      start: string;
      end: string;
      country: string;
    }) => {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      const res = await axios.post(
        "http://localhost:5000/api/createuserexperience",
        {
          position_at: data.position,
          company: data.company,
          start_At: data.start,
          end_At: data.end,
          country: data.country,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutinfo"] });
      alert("Schedule created successfully!");
      setPosition("");
      setCompany("");
      setStart("");
      setEnd("");
      setCountry("");
      handleNext();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Schedule creation failed:", error.message);
      } else {
        console.error("Schedule creation failed:", error);
      }
      alert("Error creating schedule. Check console.");
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!position || !company || !start || !end || !company) {
      alert("Please fill in all fields.");
      return;
    }

    mutation.mutate({ position, company, start, end, country });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Experience</h3>
        <div className="space-y-2">
          <Label htmlFor="position">Enter your Position At</Label>
          <Input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            id="position"
            name="position"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            name="company"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="start">Started At</Label>
          <Input
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            type="date"
            name="start"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end">End At</Label>
          <Input
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            type="date"
            name="end"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            required
          />
        </div>
        <Button type="submit">Save Experience</Button>
      </div>
    </form>
  );
};

export default Experience;
