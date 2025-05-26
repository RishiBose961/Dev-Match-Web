import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface RootState {
  auth: {
    isLoading: boolean;
    user: {
      token: string;
    } | null;
  };
}

interface PersonalInfoProps {
  handleNext: () => void;
}

const Details = ({ handleNext }: PersonalInfoProps) => {
  const [about, setAbout] = useState("");
  const [collaboration, setCollaboration] = useState("");
  const [availability, setAvailability] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);

  const addSkill = () => {
    if (skill.trim() !== "") {
      setSkills([...skills, skill.trim()]);
      setSkill("");
    }
  };

  const removeSkill = (index: number): void => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const mutation = useMutation({
    mutationFn: async (data: {
      about: string;
      availability: string;
      collaboration: string;
    }) => {
      if (!user?.token) {
        throw new Error("User not authenticated");
      }

      const res = await axios.post(
        "http://localhost:5000/api/createuserabout",
        {
          about: data.about,
          skills: skills,
          collaboration: data.collaboration,
          availability: data.availability,
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
      alert("Schedule created successfully!");
      queryClient.invalidateQueries({ queryKey: ["aboutinfo"] });
      setSkills([]);
      setAbout("");
      setCollaboration("");
      setAvailability("");
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

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!skills || !about || !collaboration || !availability) {
      alert("Please fill in all fields.");
      return;
    }

    mutation.mutate({ about, collaboration, availability });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Details</h3>
        <div className="space-y-2">
          <Label htmlFor="accountType">About</Label>

          <Input
            id="name"
            name="name"
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skillInput">Skill</Label>

          <div className="flex gap-2">
            <Input
              id="skillInput"
              name="skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Enter a skill"
            />
            <Button type="button" onClick={addSkill}>
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((s, index) => (
              <div
                key={index}
                className="flex items-center text-black bg-amber-200 px-3 py-1 rounded"
              >
                <span className="truncate max-w-[150px]">{s}</span>
                <X
                  className="ml-2 cursor-pointer"
                  onClick={() => removeSkill(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Availability</Label>
          <Select
            value={availability}
            onValueChange={(value) => setAvailability(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Evenings & Weekends">
                Evenings & Weekends
              </SelectItem>
              <SelectItem value="Weekends">Weekends</SelectItem>
              <SelectItem value="Flexible">Flexible</SelectItem>
              <SelectItem value="Weekdays">Weekdays</SelectItem>
              <SelectItem value="Evenings">Evenings</SelectItem>
              <SelectItem value="Morning">Morning</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation">Collaboration</Label>
          <Select
            defaultValue="any"
            value={collaboration}
            onValueChange={(value) => setCollaboration(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pair-programming">Pair Programming</SelectItem>
              <SelectItem value="project">Project Collaboration</SelectItem>
              <SelectItem value="mentor">Mentorship</SelectItem>
              <SelectItem value="code-review">Code Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Save Details</Button>
      </div>
    </form>
  );
};

export default Details;
