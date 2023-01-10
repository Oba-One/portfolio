import { FunctionalComponent } from "preact";
import { JSXInternal } from "preact/src/jsx";

export interface ContactDialogProps
  extends JSXInternal.HTMLAttributes<HTMLElement> {
  headerText: string;
  submitText: string;
  socials: Link[];
  onSubmit: (event: Event) => void;
}

export const ContactDialog: FunctionalComponent<ContactDialogProps> = ({
  headerText,
  submitText,
  socials,
  onSubmit,
  ...props
}) => {
  function handleSubmit(event: Event) {
    event.preventDefault();
    onSubmit(event);

    console.log("Submitted", event);
  }

  return (
    <dialog {...props} id="contact">
      <h2>{headerText}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="ron@example.com"
        />
        <textarea
          id="contact-message"
          name="message"
          placeholder="Enter Message"
        ></textarea>
        <button type="submit">{submitText}</button>
        <button type="reset">Clear</button>
      </form>
    </dialog>
  );
};
