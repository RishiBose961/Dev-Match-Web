import UseDevlopHook from "@/hook/getRecommation/UseDevlopHook";
import { useSelector } from "react-redux";
import Avatars from "../Find_Dev/Avatar";
import { Link } from "react-router";

export default function Recom_Dev() {
  const { isAuthenticated } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
      };
    }) => state.auth
  );
  const { isPending, getDevRecom } = UseDevlopHook() as {
    isPending: boolean;
    getDevRecom: Array<{
      user: {
        name: string;
        image: string;
        _id: string;
        username: string;
      };
      score: number;
    }>;
  };

  const scoreToPercentage = (score: number, decimals = 2): string => {
    return (score * 100).toFixed(decimals);
  };

  return (
    <div className="container mx-auto py-8">
      {isAuthenticated ? (
        <>
          {isPending ? (
            <span>Loading...</span>
          ) : (
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {getDevRecom?.map(
                (
                  card: {
                    user: { name: string; image: string; _id: string; username: string };
                    score: number;
                  },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="group block rounded-lg border border-gray-200  p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300 sm:p-6"
                  >
                    <Link to={`/profile/${card?.user?.username}`}>
                    <div className="flex flex-col items-center-safe space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                      {/* Image */}
                      <div className="flex-shrink-0 self-center sm:self-start">
                        <Avatars
                          image={card?.user?.image}
                          name={card?.user?.name}
                          avali={card?.user?._id}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-semibold   transition-colors">
                          {card?.user?.name}
                        </h3>
                        <p className="text-xs font-mono text-muted-foreground">Skill Match: {scoreToPercentage(card?.score, 2)}%</p>
                      </div>
                    </div>
                    </Link>
                  </div>
                )
              )}
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
