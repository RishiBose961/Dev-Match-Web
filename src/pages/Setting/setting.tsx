import SettingAbout_Skill from "@/components/Setting/SettingAbout_Skill";
import SettingAvatar from "@/components/Setting/SettingAvatar";
import SettingExperience from "@/components/Setting/SettingExperience";
import SettingProfile from "@/components/Setting/SettingProfile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GetUserId from "@/hook/getUserById/GetUserId";
import { Image, Lock, Palette, PersonStanding, User } from "lucide-react";

export default function SettingsPage() {
  const { isPending, getUserId } = GetUserId() as unknown as {
    isPending: boolean;
    getUserId: {
      profile: never;
      userDetails: {
        image: string;
        about: string;
        availability: string;
        collaboration: string;
        skills: string;
      };
      experience: never;
    };
  };

  if (isPending) return <div>Loading...</div>;
  return (
    <div className="container max-w-6xl mx-auto py-10 mb-20">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and set preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="avatar" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Avatar</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <PersonStanding className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your personal information and public profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex   gap-6 items-start">
                  <SettingProfile profileInfo={getUserId?.profile} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="avatar" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>
                  Manage your avatar and profile picture.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <SettingAvatar image={getUserId?.userDetails?.image} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>
                  Update your about information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <SettingAbout_Skill getInfo={getUserId?.userDetails} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
                <CardDescription>
                  Customize the Experience section of your profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <SettingExperience exper={getUserId?.experience} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your security settings and devices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">
                        Two-factor authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Update password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
