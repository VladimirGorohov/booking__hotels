import Loyout from "./components/Loyout/Loyout";
import { LazyHomepage } from "./components/pages/Home/Homepage.lazy.jsx";
import { LazyPersonalAccount } from "./components/pages/ PersonalAccount/PersonalAccount.lazy.jsx";
import statusUser from "./store/statusUser.js";

import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import "./App.css";
import { LazySettingsAccount } from "./components/pages/SettingsAccount/SettingsAccount.lazy.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Loyout />}>
          <Route
            path="/"
            element={
              <Suspense>
                <LazyHomepage />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense>
                <LazySettingsAccount />
              </Suspense>
            }
          />
          {/* {statusUser.autorised ? ( */}

          <Route
            path="/account"
            element={
              <Suspense>
                <LazyPersonalAccount />
              </Suspense>
            }
          />

          {/* ) : null} */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
