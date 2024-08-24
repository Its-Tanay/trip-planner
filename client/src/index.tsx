import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import HomescreenPage from "./pages/homescreen/page";
import CreateTripPage from "./pages/create-trip/page";
import { ItineraryContextProvider } from "./lib/context/itinerary-context";
import ItineraryPage from "./pages/itinerary/page";
import Provider from "./lib/context/queryclient-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomescreenPage />
      },
      {
        path: "/create-trip",
        element: <CreateTripPage />
      },
      {
        path : "/trip-itinerary",
        element : <ItineraryPage />
      }
    ]
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Provider>
      <ItineraryContextProvider>
        <RouterProvider router={router} />
      </ItineraryContextProvider>
    </Provider>
  );
}