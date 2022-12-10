import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [gender, setGender] = useState('man');
  const [age, setAge] = useState(30);
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);
  const [hobbies, setHobbies] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if(loading) return;
    setLoading(true);
    setResult('');
    const response = await fetch("/api/generate-gifts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll('\n', '<br />'));
      setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Christmas 🎁</title>
        <link rel="icon" href="https://www.favicon.cc/logo3d/574560.png" />
      </Head>

      <main className={styles.main}>
        <h3>Christmas gift generator 🎁 💡</h3>
        <form onSubmit={onSubmit}>
          <label>For who is the gift?</label>

          <select
              style={{
                    width: '100%',
                    padding: '12px 20px',
                    margin: '8px 0',
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                  outline: 'none',
                  paddingRight: '30px',
              }}
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
          >
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>

            <label>Age</label>
            <input
                type="number"
                min={1}
                max={99}
                name="age"
                placeholder="Enter the age"
                value={age}
                style={{
                    width: '100%',
                    padding: '12px 20px',
                    margin: '8px 0',
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    paddingRight: '10px',
                }}
                onChange={(e) => setAge(Number.parseInt(e.target.value))}
            />

            <label>Price from</label>
            <input type="number"
                   min={1}
                   name="priceMin"
                   placeholder="Enter the minimum price"
                   value={priceMin}
                   style={{
                          width: '100%',
                            padding: '12px 20px',
                            margin: '8px 0',
                            display: 'inline-block',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                            outline: 'none',
                            paddingRight: '10px',
                   }}
                   onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
            />

            <label>Price to</label>
            <input
                type="number"
                min={1}
                name="priceMax"
                placeholder="Enter the maximum price"
                value={priceMax}
                style={{
                    width: '100%',
                    padding: '12px 20px',
                    margin: '8px 0',
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    paddingRight: '10px',
                }}
                onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
            />

            <label>Hobbies</label>
            <input
                type="text"
                name="hobbies"
                placeholder="Enter the hobbies"
                value={hobbies}
                style={{
                    width: '100%',
                    padding: '12px 20px',
                    margin: '8px 0',
                    display: 'inline-block',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    paddingRight: '10px',
                }}
                onChange={(e) => setHobbies(e.target.value)}
            />
            <input type="submit" value="Generate gift ideas" />


        </form>
          {!loading ? (
            <div style={{
                width: '50%',
                alignContent: 'center',
                justifyContent: 'center',
                marginTop: '30px',
                padding: '12px 20px',
                // margin: '8px 0',
                display: 'inline-block',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                outline: 'none',
                paddingRight: '10px',
            }}>
                <h3 style={{
                    textAlign: 'center',

                }}>Loading christmas gift ideas 🎁</h3>
            </div>
          ) : (
              <div className={styles.result}>{result}</div>
          )}
      </main>
    </div>
  );
}
