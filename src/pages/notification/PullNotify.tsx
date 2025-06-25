import UsePullNotify from "@/hook/getNotify/UsePullNotify";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCheck } from "lucide-react";
import useNotifypullStore from "@/zustland/notifypullStore";
const PullNotify = () => {
  const { isPending, getPullNotify } = UsePullNotify() as {
    isPending: boolean;
    getPullNotify: {
      _id: string;
      senderId: {
        username: string;
      };
      message: string;
      createdAt: string;
      status: string; // Assuming status is a string, adjust if it's a different type
    }[];
  };

  const setNotifications = useNotifypullStore(
    (state) => state.setNotifications
  );

  setNotifications(getPullNotify);

  if (!getPullNotify || getPullNotify.length === 0) {
    return (
      <div>
        <p>No notifications found.</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="text-center mt-4">
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent pull requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            getPullNotify?.map(
              (
                notify: {
                  _id: string;
                  senderId: {
                    username: string;
                  };
                  message: string;
                  createdAt: string;

                  status: string;
                },
                index: number
              ) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span>
                        {notify.status === "read" ? (
                          <CheckCheck className="text-cyan-300" />
                        ) : (
                          <CheckCheck className=" text-slate-400" />
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {notify.senderId.username}
                  </TableCell>

                  <TableCell>{notify.message}</TableCell>
                  <TableCell>
                    {new Date(notify.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PullNotify;
