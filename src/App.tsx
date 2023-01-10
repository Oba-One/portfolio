import { useState, useEffect } from "preact/hooks";

import {
  ContactDialog,
  ContactDialogProps,
} from "./components/Dialogs/Contact";
import { Navigation } from "./components/Navigation";
import { LoaderDialog } from "./components/Dialogs/Loader";

import { Home, HomeProps } from "./views/Home";

let didInit = false;

export const App = () => {
  const [status, setStatus] = useState<"loading" | "error" | "done">("loading");
  const [contact, setContact] = useState<{
    headerText: string;
    submitText: string;
    socials: Link[];
  }>({
    headerText: "",
    submitText: "",
    socials: [],
  });
  const [home, setHome] = useState<HomeProps>({
    leafs: [],
    roots: [],
  });

  // useEffect(() => {
  //   if (!didInit) {
  //     didInit = true;

  //     setTimeout(() => {
  //       setHome(home);
  //       setContact(contact);
  //       setStatus("done");
  //     }, 7000);
  //   }
  // }, []);

  return (
    <>
      <Navigation status={status} />
      {status === "loading" || status === "error" ? (
        <LoaderDialog status={status} open mediaPlaying />
      ) : (
        <>
          <ContactDialog onSubmit={() => ({})} {...contact} />
          <Home {...home} />
        </>
      )}
    </>
  );
};
