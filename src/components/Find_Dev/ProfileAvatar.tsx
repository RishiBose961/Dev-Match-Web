import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GetAvaliableById from "@/hook/getAvaliable/GetAvaliableById";

interface AvatarsProps {
  image?: string;
  name?: string;
  avali?: string;
}

const ProfileAvatar = ({ image, name, avali }: AvatarsProps) => {
  const result = GetAvaliableById(avali);
  const getbyidavaliable =
    result && "getbyidavaliable" in result
      ? result.getbyidavaliable
      : undefined;

  const isPostedByCurrent = avali?.includes(getbyidavaliable?.postedBy);
  const availableValue = isPostedByCurrent
    ? getbyidavaliable?.available
    : undefined;

  return (
    <div
      className={`relative w-32 h-32 rounded-full ${
        availableValue ? "border-3 border-orange-600" : "border-2 border-zinc-500 dark:border-white"
      } flex items-center justify-center`}
    >
      <div className="w-full h-full rounded-full overflow-hidden">
        <Avatar className="w-full h-full bg-gradient-to-r from-emerald-400 to-cyan-400">
          <AvatarImage
            src={image}
            alt="avatar"
            className="object-cover w-full h-full"
          />
          <AvatarFallback className="text-xl w-full h-full flex items-center justify-center bg-black text-white">
            {name?.[0] || "?"}
          </AvatarFallback>
        </Avatar>
      </div>

      {availableValue && (
        <div className="absolute bottom-0 bg-orange-600 text-white text-[10px] font-semibold px-1 py-0.5 rounded shadow-md">
          LIVE
        </div>
      )}
      
    </div>
  );
};

export default ProfileAvatar;
