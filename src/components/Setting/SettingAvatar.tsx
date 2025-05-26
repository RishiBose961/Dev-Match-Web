import { useState } from "react";
import { Button } from "../ui/button";
import avatarNames from "@/assets/avatarNames.json";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";

interface SettingAvatarProps {
  image: string;
}

const SettingAvatar = ({ image }: SettingAvatarProps) => {
  const result = avatarNames;

  const avatarStyles = [
    "avataaars",
    "croodles",
    "initials",
    "miniavs",
    "personas",
    "open-peeps",
  ];

  const [selectedStyle, setSelectedStyle] = useState("avataaars");
  const [selectedName, setSelectedName] = useState(""); // Track name only

  const queryClient = useQueryClient();
  const { user } = useSelector(
    (state: { auth: { user: { token: string; _id: string } | null } }) =>
      state.auth
  );

  const getAvatarUrl = (name: string, style: string = selectedStyle) =>
    `https://api.dicebear.com/9.x/${style}/svg?seed=${name}`;

  const selectedAvatar = selectedName
    ? getAvatarUrl(selectedName)
    : image;

  const mutation = useMutation({
    mutationFn: async () => {

      const res = await axios.put(
        `http://localhost:5000/api/getuserabout/update/${user?._id}`,
        { image: selectedAvatar },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutinfo"] });
      alert("Avatar updated successfully!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error("Update failed:", error.message);
      } else {
        console.error("Update failed:", error);
      }
      alert("Error updating avatar. Check console.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedName) {
      alert("Please select an avatar before saving.");
      return;
    }
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <img
          src={selectedAvatar}
          alt="Selected Avatar"
          className="size-32 bg-zinc-300 rounded-full ring-4 ring-amber-400"
        />
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <Button type="submit">Upload</Button>
        <select
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
          className="border px-2 py-1 rounded-md "
        >
          {avatarStyles.map((style) => (
            <option key={style} value={style} className="text-black">
              {style}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mt-4 gap-3">
        {result.map((item) => {
          const avatarUrl = getAvatarUrl(item.name);
          const isSelected = item.name === selectedName;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedName(item.name)}
              className={`cursor-pointer rounded-full p-1 ${
                isSelected ? "ring-4 ring-orange-500 w-fit" : ""
              }`}
            >
              <img
                src={avatarUrl}
                alt={item.name}
                className="size-20 bg-zinc-300 rounded-full"
              />
            </div>
          );
        })}
      </div>

    </form>
  );
};

export default SettingAvatar;
