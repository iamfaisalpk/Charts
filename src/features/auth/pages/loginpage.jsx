import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import { db } from "../../../services/firebase/firebase";
import { setUser } from "../../../services/redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", email.trim()),
        where("password", "==", password),
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert("User not found");
        return;
      }

      const userDoc = snapshot.docs[0];
      const userData = userDoc.data();
      const userCredentials = {
        id: userDoc.id,
        email: userData.email,
        role: userData.role,
      };

      localStorage.setItem(
        "ISSUE_BOX_CREDENTIALS",
        JSON.stringify(userCredentials),
      );

      dispatch(setUser(userCredentials));

      navigate("/");
    } catch (error) {
      console.error("Login validation error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <Card>
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to continue</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
            disabled={isLoading}
          />

          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            disabled={isLoading}
          />

          <Button type="submit" loading={isLoading} fullWidth>
            Sign In
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default LoginPage;
