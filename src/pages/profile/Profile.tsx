import ProfileAvatar from "@/components/Find_Dev/ProfileAvatar";
import FollowButton from "@/components/Follow/FollowButton";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

import {
  Award,
  Briefcase,
  Calendar,
  Code2,
  Mail,
  Settings,
  Users
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
interface Experience {
  position_at: string;
  company: string;
  start_At: string;
  end_At: string;
  country: string;
}

const Profile = () => {
  const { id } = useParams();
  

  const { user } = useSelector(
    (state: {
      auth: {
        isLoading: boolean;
        user: { _id: string };
      };
    }) => state.auth
  );

  const {
    isPending,
    error,
    isError,
    data: developer,
  } = useQuery({
    queryKey: ["developerInfos", id],
    queryFn: async () => {
      return await fetch(
        `http://localhost:5000/api/search?username=${id}`
      ).then((res) => res.json());
    },
    staleTime: 10000,
  });

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isPending) {
    return <span>Pending...</span>;
  }

  const nofounduserDetails =
    Object.keys(developer?.userDetails || {}).length === 0;

  const nofoundExperience =
    Array.isArray(developer?.experience) && developer.experience.length === 0;

  return (
    <div className="  transition-colors mb-20 duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shadow rounded-md overflow-hidden transition-colors duration-200">
          {/* Cover photo */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <div className="absolute -bottom-15 left-8">
              <ProfileAvatar
                image={developer?.profile?.image}
                name={developer?.profile?.name}
                avali={developer?.profile?._id}
              />
            </div>
            {developer?.profile?._id === user?._id && (
              <div className="absolute top-20 right-8">
                <Link to="/setting">
                  <Settings />
                </Link>
              </div>
            )}
          </div>

          <div className="pt-20 pb-6 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {developer?.profile?.name}
                  </h1>
                </div>

                <div>
                  <p className="text-sm  text-primary">
                    {developer?.profile?.username}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {nofounduserDetails
                    ? "No developer Skills Found"
                    : developer?.userDetails?.collaboration?.map(
                        (skill: string, index: number) => (
                          <Badge
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 
                            py-0.5 rounded-md text-xs capitalize"
                          >
                            {skill}
                          </Badge>
                        )
                      )}
                </div>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                <FollowButton/>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    About
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {nofounduserDetails
                      ? "No developer About Found"
                      : developer?.userDetails?.about}
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {nofounduserDetails
                      ? "No developer Skills Found"
                      : developer?.userDetails?.skills?.map(
                          (skill: string, index: number) => (
                            <span
                              key={index}
                              className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs font-medium"
                            >
                              {skill}
                            </span>
                          )
                        )}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {nofoundExperience
                      ? "No developer Experience Found"
                      : developer?.experience?.map(
                          (exp: Experience, index: number) => (
                            <div key={index} className="flex items-center">
                              <div className="mr-4">
                                <div className="h-12 w-12 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {exp.position_at}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  {exp.company} {exp?.country}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(exp?.start_At).toDateString()} -{" "}
                                  {new Date(exp?.end_At).toDateString()}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6 transition-colors duration-200">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Contact & Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Availability
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {nofounduserDetails
                            ? "No developer Availability Found"
                            : developer?.userDetails?.availability}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Email
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {developer?.profile?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 transition-colors duration-200">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Developer Stats
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                        <Code2 className="h-6 w-6" />
                      </div>
                      <p className="mt-2 font-semibold text-xl text-gray-900 dark:text-white">
                        {developer?.completed?.projects}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Projects
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                        <Users className="h-6 w-6" />
                      </div>
                      <p className="mt-2 font-semibold text-xl text-gray-900 dark:text-white">
                        {developer?.completed?.sessions}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Sessions
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400">
                        <Award className="h-6 w-6" />
                      </div>
                      <p className="mt-2 font-semibold text-xl text-gray-900 dark:text-white">
                        {developer?.completed?.mentored}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        Mentored
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
