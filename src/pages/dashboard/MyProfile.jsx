import { useContext } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const { displayName, email, photoURL, role } = user;

  //   console.log(photoURL);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary">My Profile</h2>

      <Card className="shadow-md">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={photoURL || "/placeholder-avatar.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border shadow-md"
          />

          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-semibold">{displayName}</h3>
            <p className="text-muted-foreground">{email}</p>

            {role && role !== "user" && (
              <Badge variant="secondary" className="mt-1 capitalize">
                {role}
              </Badge>
            )}

            <Separator className="my-4 md:hidden" />

            {/* Optional fields */}
            <div className="text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  Account Type:
                </span>{" "}
                {role === "user" ? "Regular User" : role}
              </p>
              <p>
                <span className="font-medium text-foreground">Joined:</span>{" "}
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProfile;
