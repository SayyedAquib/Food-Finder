import { Suspense } from "react";

const Loadable = (Component, Fallback) => (props) =>
  (
    <Suspense fallback={<Fallback />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
