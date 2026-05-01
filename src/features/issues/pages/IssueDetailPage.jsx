import { useEffect, useState } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StatusTag from "../../../components/ui/StatusTag";
import { db } from "../../../services/firebase/firebase";

const IssueDetailPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const role = String(user?.role || "").toLowerCase();
  const isAdmin = role === "admin";
  const [issue, setIssue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentMessage, setCommentMessage] = useState("");
  const [isSavingComment, setIsSavingComment] = useState(false);

  const navigate = useNavigate();

  const fetchIssue = async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    try {
      const issueRef = doc(db, "issues", id);
      const issueSnapshot = await getDoc(issueRef);

      if (issueSnapshot.exists()) {
        let createdByData = null;
        if (issueSnapshot.data().createdBy) {
          const userSnapshot = await getDoc(issueSnapshot.data().createdBy);
          createdByData = {
            id: userSnapshot.id,
            ...userSnapshot.data(),
          };
        }
        setIssue({
          id: issueSnapshot.id,
          ...issueSnapshot.data(),
          createdBy: createdByData,
        });
      } else {
        setIssue(null);
      }
    } catch (error) {
      console.error("Error fetching issue details", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchComments = async () => {
    if (!id) {
      setIsLoadingComments(false);
      return;
    }

    setIsLoadingComments(true);
    try {
      const issueRef = doc(db, "issues", id);
      const commentsQuery = query(
        collection(db, "comments"),
        where("issueId", "==", issueRef),
      );

      const snapshot = await getDocs(commentsQuery);
      if (snapshot.empty) {
        setComments([]);
        return;
      }

      const issueCommentsDoc = snapshot.docs[0];
      const issueCommentsData = issueCommentsDoc.data();
      const commentItems = Array.isArray(issueCommentsData.comments)
        ? issueCommentsData.comments
        : [];

      const fetchedComments = await Promise.all(
        commentItems.map(async (commentItem, index) => {
          let userName = "-";

          if (commentItem?.userId) {
            const userSnapshot = await getDoc(commentItem.userId);
            if (userSnapshot.exists()) {
              userName = userSnapshot.data()?.name || "-";
            }
          }

          return {
            docId: `${issueCommentsDoc.id}-${index}`,
            ...commentItem,
            userName,
          };
        }),
      );

      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formatCreatedAt = (value) => {
    if (!value?.toDate) return "-";
    return value.toDate().toLocaleString();
  };

  const handleStatusUpdate = async (status) => {
    if (!id || !isAdmin) return;

    setIsUpdatingStatus(true);
    try {
      const issueRef = doc(db, "issues", id);
      await updateDoc(issueRef, { status });
      await fetchIssue();
    } catch (error) {
      console.error("Error updating issue status", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSaveComment = async () => {
    if (!id || !user?.id || !commentMessage.trim()) return;

    setIsSavingComment(true);

    try {
      const issueRef = doc(db, "issues", id);
      const userRef = doc(db, "users", user.id);

      const newComment = {
        id: crypto.randomUUID(),
        message: commentMessage.trim(),
        userId: userRef,
        createdAt: new Date(),
      };

      const commentsQuery = query(
        collection(db, "comments"),
        where("issueId", "==", issueRef),
      );

      const snapshot = await getDocs(commentsQuery);

      if (snapshot.empty) {
        await addDoc(collection(db, "comments"), {
          issueId: issueRef,
          comments: [newComment],
        });
      } else {
        await updateDoc(snapshot.docs[0].ref, {
          comments: arrayUnion(newComment),
        });
      }

      setCommentMessage("");
      await fetchComments();
    } catch (error) {
      console.error("Error saving comment:", error);
    } finally {
      setIsSavingComment(false);
    }
  };

  const getIssueUserName = (issue) => {
    if (issue?.createdBy?.name) {
      return issue.createdBy.name;
    }

    if (issue?.createdBy?.id && issue.createdBy.id === user?.id && user?.name) {
      return user.name;
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-blue-50/50 p-4">
      <div className="mx-auto grid h-full w-full max-w-7xl grid-cols-10 overflow-hidden rounded-2xl border-2 border-gray-200 bg-white">
        <section className="relative col-span-7 flex h-full flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="mt-6 rounded-xl border border-gray-200 p-4 text-sm text-gray-600">
                Loading issue...
              </div>
            ) : !issue ? (
              <div className="mt-6 rounded-xl border border-gray-200 p-4 text-sm text-gray-600">
                Issue not found.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-8 sticky top-0 z-50 border-b border-gray-200 pb-4 bg-white">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate("/issues")}
                        className="p-1 size-9 flex items-center justify-center border rounded-lg border-gray-200 hover:bg-gray-50 "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="currentColor"
                        >
                          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                        </svg>
                      </button>
                      <h1 className="line-clamp-1 break-all text-2xl font-semibold text-gray-900">
                        {issue.title || "-"}
                      </h1>
                    </div>
                    <StatusTag status={issue?.status || "pending"} />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {formatCreatedAt(issue.createdAt)} &bull;{" "}
                    {getIssueUserName(issue)}
                  </p>
                </div>

                <div className="p-8 pt-4">
                  <h2 className="text-base font-semibold text-gray-900">
                    Issue Details
                  </h2>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-gray-800">
                    {issue.descp || "-"}
                  </p>
                </div>

                <div className="p-8 pt-4 border-t border-gray-200">
                  <h2 className="text-base font-semibold text-gray-900">
                    Suggested Fix
                  </h2>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-gray-800">
                    {issue.suggestion || "-"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {isAdmin ? (
            <div className="sticky bottom-0 left-0 z-50 right-0 border-t border-gray-200 bg-white px-6 py-4">
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => handleStatusUpdate("rejected")}
                  disabled={isUpdatingStatus || isLoading || !issue}
                  className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-100 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdatingStatus ? "Updating..." : "Reject"}
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusUpdate("resolved")}
                  disabled={isUpdatingStatus || isLoading || !issue}
                  className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-100 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdatingStatus ? "Updating..." : "Resolve"}
                </button>
              </div>
            </div>
          ) : null}
        </section>

        <aside className="relative col-span-3 h-full overflow-hidden border-l border-gray-200">
          <div className="border-b border-gray-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Comments</h2>
            <p className="mt-1 text-sm text-gray-600">
              Discuss this issue with quick updates and notes.
            </p>
          </div>

          <div className="h-[calc(100%-73px)] overflow-y-auto px-4 py-4 pb-24 bg-gray-50/40">
            {isLoadingComments ? (
              <div className="rounded-xl border border-gray-200 p-3 text-sm text-gray-600">
                Loading comments...
              </div>
            ) : comments.length === 0 ? (
              <div className="rounded-xl border border-gray-200 p-3 text-sm text-gray-600">
                No comments found for this issue.
              </div>
            ) : (
              <div className="space-y-3 ">
                {comments.map((commentItem) => (
                  <div
                    key={commentItem.docId}
                    className="rounded-xl border-2 border-gray-200 p-3 bg-white"
                  >
                    <div className="text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-gray-900">
                          {commentItem.userName || "-"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatCreatedAt(commentItem.createdAt)}
                        </p>
                      </div>
                      <p className="mt-2 text-gray-700">
                        {commentItem.message || "-"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentMessage}
                onChange={(event) => setCommentMessage(event.target.value)}
                disabled={isSavingComment}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                onClick={handleSaveComment}
                disabled={isSavingComment || !commentMessage.trim()}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {isSavingComment ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default IssueDetailPage;
