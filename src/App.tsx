import Footer from "./components/Footer";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useEffect, useReducer } from "react";
import { cartReducer, initialState } from "./reducers/cartReducer";
/**Primirive types : [number, string, boolean,null,undefined] */
function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    if (state.cart.length) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);
  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {state.guitars.map((guitar) => (
            <Guitar guitar={guitar} key={guitar.id} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
