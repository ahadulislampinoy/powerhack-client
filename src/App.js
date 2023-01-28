import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";

function App() {
  return (
    <div className="bg-gray-900 text-gray-50">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
