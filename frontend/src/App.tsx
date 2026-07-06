import { getResponse } from "./api/fetchHelpers";

function App() {
  return (
    <div>
      <p>Here is is!</p>
      <button
        onClick={async () => {
          console.log(await getResponse("/", {
            username: "",
            key: ""
          }));
        }}
      >
        Run call
      </button>
    </div>
  );
}

export default App;
