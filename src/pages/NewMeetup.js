import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

import NewMeetupForm from "../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const history = useHistory();

  function addMeetupHandler(meetupData) {
    auth.currentUser
      .getIdToken(true)
      .then((idToken) => {
        fetch(
          `https://retail-management-ccd0b-default-rtdb.firebaseio.com//products.json?auth=${idToken}`,
          {
            method: "POST",
            body: JSON.stringify(meetupData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      })
      .then(() => {
        history.replace("/all-meetups");
      });
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
