import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/ui/Button";
import StatusTag from "../../../components/ui/StatusTag";
import { db } from "../../../services/firebase/firebase";
import { clearUser } from "../../../services/redux/reducers/userReducer";

const IssuePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  const handleLogout = () => {
    localStorage.removeItem("ISSUE_BOX_CREDENTIALS");
    dispatch(clearUser());
    navigate("/login");
  };

  const formatIssueDateTime = (value) => {
    if (!value) {
      return "Time unavailable";
    }

    const dateValue =
      typeof value?.toDate === "function" ? value.toDate() : new Date(value);

    if (Number.isNaN(dateValue.getTime())) {
      return "Time unavailable";
    }

    return dateValue.toLocaleString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIssueUserName = (issue) => {
    if (issue?.createdBy?.name) {
      return issue.createdBy.name;
    }

    if (issue?.createdBy?.id && issue.createdBy.id === user?.id && user?.name) {
      return user.name;
    }

    if (issue?.createdBy?.id) {
      return `user-${issue.createdBy.id.slice(0, 6)}`;
    }

    return "unknown-user";
  };

  useEffect(() => {
    const fetchIssues = async () => {
      if (!user?.id) {
        setIssues([]);
        setIsLoading(false);
        return;
      }

      try {
        let issuesQuery;

        if (isAdmin) {
          issuesQuery = query(collection(db, "issues"));
        } else {
          const userRef = doc(db, "users", user.id);

          issuesQuery = query(
            collection(db, "issues"),
            where("createdBy", "==", userRef),
          );
        }

        const snapshot = await getDocs(issuesQuery);

        const fetchedIssues = await Promise.all(
          snapshot.docs.map(async (docItem) => {
            const issueData = docItem.data();

            let createdByData = null;

            if (issueData.createdBy) {
              const userSnapshot = await getDoc(issueData.createdBy);
              createdByData = {
                id: userSnapshot.id,
                ...userSnapshot.data(),
              };
            }

            return {
              id: docItem.id,
              ...issueData,
              createdBy: createdByData,
            };
          }),
        );
        console.log(fetchedIssues, "fetchedIssues");

        setIssues(fetchedIssues);
      } catch (error) {
        console.error("Error fetching issues", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, [isAdmin, user?.id]);

  return (
    <div className="min-h-screen bg-blue-50/50">
      <div className="mx-auto w-full max-w-5xl px-4 pb-8 pt-28">
        <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4">
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-gray-900">Issues</h1>
              <p className="mt-1 text-sm text-gray-600">
                Track, review, and manage project issues from one place.
              </p>
            </div>
            <div className="ml-4 flex items-center gap-2">
              {isUser ? (
                <Button onClick={() => navigate("/issues/add-issue")}>
                  Add New Issue
                </Button>
              ) : null}

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {isLoading ? (
          <div className="p-8 text-center text-sm text-gray-600">
            Loading issues...
          </div>
        ) : issues.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-600">
            No issues added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 rounded-xl border border-gray-200 bg-white">
            {issues.map((issue) => (
              <button
                key={issue.id}
                type="button"
                onClick={() => navigate(`/issues/${issue.id}`)}
                className="cursor-pointer flex w-full items-start justify-between border-b border-gray-200 p-4 py-4 text-left transition hover:bg-gray-100 last:border-b-0"
              >
                <div className="min-w-0 flex-grow pr-4">
                  <h2 className="line-clamp-1 break-all text-base font-semibold text-gray-900">
                    {issue.title || "Untitled issue"}
                  </h2>
                  <p className="mt-1 line-clamp-1 break-all text-sm text-gray-600">
                    {issue.descp || "No description"}
                  </p>
                  <p className="mt-4 text-xs text-gray-500">
                    {formatIssueDateTime(issue.createdAt || issue.updatedAt)}{" "}
                    <span aria-hidden="true">&bull;</span>{" "}
                    {getIssueUserName(issue)}
                  </p>
                </div>

                <div className="flex flex-shrink-0 items-center">
                  <StatusTag status={issue.status} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IssuePage;
