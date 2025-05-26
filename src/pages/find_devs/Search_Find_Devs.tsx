import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const Search_Find_Devs = () => {
  return (
    <div>
      {" "}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row">
            <div className="w-full p-2 space-y-3">
              <p className=" font-bold text-primary">Search</p>
              <Input placeholder="Search for developers" />
              <p className="font-bold text-primary">Collaboration Type</p>
              <Select defaultValue="any">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any type</SelectItem>
                  <SelectItem value="pair-programming">
                    Pair Programming
                  </SelectItem>
                  <SelectItem value="project">Project Collaboration</SelectItem>
                  <SelectItem value="mentor">Mentorship</SelectItem>
                  <SelectItem value="code-review">Code Review</SelectItem>
                </SelectContent>
              </Select>
              <p className="font-bold text-primary">Skills</p>
              <Select defaultValue="any">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any skill</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="nodejs">Node.js</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="django">Django</SelectItem>
                  <SelectItem value="aws">AWS</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2 mt-6">
                <Switch id="available-now" />
                <Label htmlFor="available-now">Available Now</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Search_Find_Devs;
