import { CircularProgress } from "@mui/material";

export function AuthLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <CircularProgress />
    </div>
  );
}
