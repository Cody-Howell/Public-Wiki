import { getResponse } from "./api/fetchHelpers";

function App() {
  return (
    <div>
      <p>Here is is!</p>
      <button
        onClick={async () => {
          console.log(await getResponse("/"));
        }}
      >
        Run call
      </button>
    </div>
  );
}

export default App;
