import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface SettingAboutSkillProps {
  getInfo: {
    about?: string;
    availability?: string;
    collaboration?: string;
    skills?: string;
  };
}

const SettingAbout_Skill: React.FC<SettingAboutSkillProps> = ({ getInfo }) => {
  
  return (
    <div className="grid gap-4 flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="About">About</Label>
          <Input id="About" defaultValue={getInfo?.about} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="Availability">Availability</Label>
          <Input id="Availability" defaultValue={getInfo?.availability} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="Collaboration">Collaboration</Label>
        <Input id="Collaboration" defaultValue={getInfo?.collaboration} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="last-name">Skills</Label>
        <Input id="last-name" defaultValue={getInfo?.skills} />
      </div>
      <div className="space-y-2 flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingAbout_Skill;
