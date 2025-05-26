import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface SettingProfileProps {
  profileInfo: {
    name?: string;
    username?: string;
    email?: string;
    availableHistory?: string;
    // add other fields as needed
  };
}

const SettingProfile = ({ profileInfo }: SettingProfileProps) => {
 

  return (
    <div className="grid gap-4 flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">Name</Label>
          <Input id="first-name" defaultValue={profileInfo?.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Username</Label>
          <Input id="last-name" defaultValue={profileInfo?.username} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" defaultValue={profileInfo?.email} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="live">Avaliable/LIVE</Label>
        <Input id="live" defaultValue={profileInfo?.availableHistory} disabled />
      </div>
    </div>
  );
};

export default SettingProfile;
