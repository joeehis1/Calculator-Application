/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCallback, useContext, useEffect, useState } from "react";

import { ThemeContext } from "./ThemeContext";

import { TYPING_STATUS_ENUM, OPERATORS, KEYS, theme } from "./Keys";

class Calcuator {
    #operations = new Map([
        [
            "+",
            (val1, val2) => {
                return val1 + val2;
            },
        ],
        [
            "-",
            (val1, val2) => {
                return val1 - val2;
            },
        ],
        [
            "/",
            (val1, val2) => {
                return val1 / val2;
            },
        ],
        [
            "*",
            (val1, val2) => {
                return val1 * val2;
            },
        ],
    ]);

    calculate(val1, val2, operator) {
        const calcFunc = this.#operations.get(operator);
        return calcFunc(val1, val2);
    }
}

function correctDecimalValue(str) {
    let value = str.endsWith(".") ? `${str.slice(0, str.indexOf("."))}` : str;

    return value;
}

const myCalc = new Calcuator();

function getTheme() {
    if (localStorage.getItem("currentTheme")) {
        return localStorage.getItem("currentTheme");
    }
    if (!window.matchMedia) return null;

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    if (query.matches) {
        return theme.themeC;
    } else if (!query.matches) {
        return theme.themeB;
    }

    return null;
}

export function ThemeContextProvider({ children }) {
    //if the theme retrieved from local storage is null use themeA
    const [currentTheme, setCurrentTheme] = useState(
        getTheme() || theme.themeA
    );

    function updateTheme(theme) {
        setCurrentTheme(theme);

        //save this theme to local storage
        localStorage.setItem("currentTheme", theme);
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function App() {
    const values = useContext(ThemeContext);
    const { currentTheme } = values;

    // console.log(currentTheme);

    useEffect(() => {
        document.body.className = currentTheme;
    }, [currentTheme]);
    return (
        <>
            <div className="container">
                <CalculatorHeader />
                <CalculatorInterface />
            </div>
        </>
    );
}

function CalculatorHeader() {
    const values = useContext(ThemeContext);
    const { currentTheme } = values;
    return (
        <header className={`${currentTheme}`}>
            <h1>
                <strong>Calculator</strong>
            </h1>
            <ThemeControlSection />
        </header>
    );
}

function ThemeControlSection() {
    return (
        <div className={`theme-control-section `}>
            <h2>Theme</h2>
            <p className="visually-hidden">
                Select one of the radio buttons to use a different theme.
            </p>
            <div className="theme-controls">
                <ThemeSelector
                    theme={theme.themeA}
                    shownlabel={1}
                    hiddenLabel={"Theme 1"}
                />
                <ThemeSelector
                    theme={theme.themeB}
                    shownlabel={2}
                    hiddenLabel={"Theme 2"}
                />
                <ThemeSelector
                    theme={theme.themeC}
                    shownlabel={3}
                    hiddenLabel={"Theme 3"}
                />
            </div>
        </div>
    );
}

function ThemeSelector({ theme, shownlabel, hiddenLabel }) {
    const values = useContext(ThemeContext);
    const { currentTheme, updateTheme } = values;

    function handleThemeChange(e) {
        updateTheme(e.target.value);
    }
    return (
        <label className={`theme-control ${currentTheme}`} htmlFor={theme}>
            <div aria-hidden="true" className="theme-label">
                {shownlabel}
            </div>
            <div className="visually-hidden">{hiddenLabel}</div>
            <input
                type="radio"
                id={theme}
                name="theme"
                value={theme}
                checked={currentTheme === theme}
                onChange={handleThemeChange}
            />
        </label>
    );
}

function CalculatorInterface() {
    const [displayedValue, setDisplayedValue] = useState("0");

    const [intermediateValue, setIntermediateValue] = useState(null);

    const [negateNextValue, setNegateNextValue] = useState(false);

    const [operator, setOperator] = useState(null);

    const [inputStatus, setInputStatus] = useState(TYPING_STATUS_ENUM.V);

    // const [finalResult, setFinalResult] = useState(null);
    const [displayed, setDisplayed] = useState(null);

    const typingNumber = useCallback(
        (num) => {
            if (inputStatus === TYPING_STATUS_ENUM.O && negateNextValue) {
                //This will allow you to

                setDisplayedValue(`-${num}`);
                setInputStatus(TYPING_STATUS_ENUM.V);
                return;
            }
            if (inputStatus === TYPING_STATUS_ENUM.O) {
                setDisplayedValue(num);
                setInputStatus(TYPING_STATUS_ENUM.V);
                return;
            }
            if (inputStatus === TYPING_STATUS_ENUM.F) {
                setIntermediateValue(null);
                setOperator(null);
                setDisplayedValue(num);
                setInputStatus(TYPING_STATUS_ENUM.V);
                return;
            }

            setDisplayedValue((displayedValue) => {
                if (displayedValue === "0") return num;

                return `${displayedValue}${num}`;
            });
        },
        [inputStatus, negateNextValue]
    );

    const calculatorOperation = useCallback(
        (oper) => {
            // to run this function you need two values and an operator
            // to continue to call this function you somehow need to calculate
            // take the value that you've typed and store it

            // allow the typing of a new value into the field

            // run this operation using the stored value and the displayed value

            // store the result of this operation as the new stored value

            // set the result of this operation to be the new displayed value

            // allow the typing of a new value into the field

            // do not update the stored value unless a fresh value has been typed in

            // case 1 no intermediate value
            //set intermediate value to be the displayed value
            //assuming that this is a fresh call we will allow the user to type in a new value
            //and do nothing else

            // case 2 there is an intermediate value
            // status intermediate value is the displayed value
            // indicate to prog that user should be typing a new value by indicating that an operator has been added
            // do nothing with the intermediate and displayed value

            // case 3 there is an intermediate value
            // status indicates that an operator has been added
            // calculate intermediate result
            // set intermediate value to the intermediate result
            // indicate the prog that user should be typing a new value
            // do not calculate a new intermediate result unless a new value has been typed

            // part of the calculator logic involves changing the operator
            //

            // setOperator(operator);

            if (inputStatus === TYPING_STATUS_ENUM.F) {
                //This is for when you click on an operator after clicking on the equals to sign

                setDisplayed(null);
                setNegateNextValue(false);
                //This is for setting the operator after entering a value and then clicking on the equals sign
                setOperator(oper);
                setIntermediateValue(displayedValue);
                setInputStatus(TYPING_STATUS_ENUM.O);
                return;
            }
            if (inputStatus === TYPING_STATUS_ENUM.V && intermediateValue) {
                //Take into account a user forgetting to include a decimal befre
                // const nextValue = negateNextValue ? 0 - Number(displayedValue) : Number
                const result = myCalc.calculate(
                    Number(intermediateValue),
                    Number(displayedValue),
                    operator
                );
                // Number(displayedValue) +
                // Number(intermediateValue);

                setOperator(oper);
                setNegateNextValue(false);
                setIntermediateValue(result.toString());
                setDisplayedValue(result.toString());
                setInputStatus(TYPING_STATUS_ENUM.O);

                return;
            }

            // if input status is entering value when an operator is clicked on
            if (inputStatus === TYPING_STATUS_ENUM.V) {
                // let value = displayedValue.endsWith(".")
                //     ? `${displayedValue}0`
                //     : displayedValue;

                let value = correctDecimalValue(displayedValue);
                setIntermediateValue(value);
                //Test
                //This should handle assigning the operator on first click and on subsequent clicks
                setOperator(oper);
                setDisplayedValue(value);
                setInputStatus(TYPING_STATUS_ENUM.O);
                return;
            }

            if (inputStatus === TYPING_STATUS_ENUM.O) {
                //i only want to set operator to oper if this oper is not minus
                //if this oper is minus i want to negate the next value that will be used in the calculation
                if (negateNextValue) {
                    const nextValue = 0 - Number(displayedValue);
                    setNegateNextValue(false);
                    setOperator(oper);
                    setDisplayedValue(parseFloat(nextValue).toString());
                    return;
                }
                if (oper === OPERATORS.SUBTRACT) {
                    const negativeNextValue = 0 - Number(displayedValue);
                    setNegateNextValue(true);

                    setDisplayedValue(parseFloat(negativeNextValue).toString());
                    return;
                }
                setOperator(oper);
                return;
            }

            // setIntermediateValue(displayedValue)
        },
        [
            displayedValue,
            inputStatus,
            intermediateValue,
            negateNextValue,
            operator,
        ]
    );

    const handleDecimal = useCallback(() => {
        // I want to attach a decimal when ever i click on this button
        // what type of number do we have already?
        // if the number is 0 directly append the decimal
        // if the number is a number also the same
        // if the number already has a decimal ignore or the number already includes a decimal also ignore
        // if i click on the . by itself when im entering a value

        // Make change to operator functionality so that it recognises that a decimal has been typed

        // Normal usage: user types a number and appends point

        // set displayed input to displayedInput.

        if (inputStatus === TYPING_STATUS_ENUM.F) {
            //CLicking on a decimal after an operation is completed will reset displayed value to zero
            setIntermediateValue(null);
            setOperator(null);
            setDisplayedValue("0");
            setInputStatus(TYPING_STATUS_ENUM.V);
        }

        setDisplayedValue((value) => {
            if (
                value.toString().includes(".") ||
                value.toString().endsWith(".")
            )
                return value.toString();
            return `${value}.`;
        });
    }, [inputStatus]);

    const calcDelete = useCallback(() => {
        if (inputStatus === TYPING_STATUS_ENUM.F) {
            return resetCalc();
        }
        setDisplayedValue((value) => {
            if (value === "0") return value;
            return "0";
        });
    }, [inputStatus]);

    const handleFinalCalculation = useCallback(() => {
        //
        // final calculation
        // the final result will be stored as a result of calling this function
        // when i click on this function it is going to take the displayed value, the intermediate value and the operation
        // perform the operation and store the result in the intermediate value

        // the nullness of this final result will influence the result string that shows up

        //     // Here i will want to make sure that if displayedValue is zero or more and displayed value is not equal to the final result  and also intermediate value is null
        //     // i will want to set the final result to the displayed value
        //     // and as always allow the ability ti start typing a new value once they are done

        //     setInputStatus(TYPING_STATUS_ENUM.O);
        //     return;
        // }

        // #initial idea for this function #

        // if (
        //     Number(displayedValue) >= 0 ||
        //     (Number(displayedValue) >= 0 &&
        //         Number(displayedValue) !==
        //             Number(finalResult) &&
        //         !intermediateValue)
        // ) {
        //     console.log(
        //         finalResult,
        //         displayedValue,
        //         intermediateValue
        //     );
        //     setFinalResult(displayedValue);

        //     // this is to make sure that i can type in a new value after ive clicked on equal to
        //     setInputStatus(TYPING_STATUS_ENUM.O);
        //     return;
        // }

        // if (
        //     displayedValue &&
        //     !intermediateValue &&
        //     operator &&
        //     !finalResult
        // ) {
        //     // setDisplayedValue
        // }

        // Final idea is to use a slightly modified version of the operator function

        if (
            (inputStatus === TYPING_STATUS_ENUM.V &&
                intermediateValue &&
                operator) || // click on equals to after entering a value
            inputStatus === TYPING_STATUS_ENUM.O // if the equals operator is clicked on after an operator has been clicked on
        ) {
            const result = myCalc.calculate(
                Number(intermediateValue),
                Number(displayedValue),
                operator
            );

            // These are the final values that are shown after a calculation is completed
            // For here i might have to use a separate state value to store the displayed and the intermediate values
            setDisplayed({
                val1: correctDecimalValue(intermediateValue),
                val2: correctDecimalValue(displayedValue),
            });

            // setIntermediateValue(result.toString());
            setInputStatus(TYPING_STATUS_ENUM.F);
            setNegateNextValue(false);
            // DIsplayed result
            setDisplayedValue(result.toString());
            return;
        }

        if (inputStatus === TYPING_STATUS_ENUM.V) {
            let value = correctDecimalValue(displayedValue);
            setIntermediateValue(value);
            setDisplayedValue(value);
            //Test

            setInputStatus(TYPING_STATUS_ENUM.F);
            return;
        }
    }, [displayedValue, inputStatus, intermediateValue, operator]);

    function resetCalc() {
        setDisplayedValue("0");
        setIntermediateValue(null);
        setOperator(null);
        setInputStatus(TYPING_STATUS_ENUM.V);
    }

    useEffect(() => {
        function handleCalcKeyDown(e) {
            if (e.code === KEYS.KEY_ONE || e.code === KEYS.NUMPAD_ONE) {
                typingNumber("1");
                return;
            }
            if (e.code === KEYS.KEY_TWO || e.code === KEYS.NUMPAD_TWO) {
                typingNumber("2");
                return;
            }
            if (e.code === KEYS.KEY_THREE || e.code === KEYS.NUM_THREE) {
                typingNumber("3");
                return;
            }
            if (e.code === KEYS.KEY_FOUR || e.code === KEYS.NUM_FOUR) {
                typingNumber("4");
                return;
            }
            if (e.code === KEYS.KEY_FIVE || e.code === KEYS.NUM_FIVE) {
                typingNumber("5");
                return;
            }
            if (e.code === KEYS.KEY_SIX || e.code === KEYS.NUM_SIX) {
                typingNumber("6");
                return;
            }
            if (e.code === KEYS.KEY_SEVEN || e.code === KEYS.NUM_SEVEN) {
                typingNumber("7");
                return;
            }
            if (
                (e.code === KEYS.KEY_EIGHT || e.code === KEYS.NUM_EIGHT) &&
                !e.shiftKey
            ) {
                typingNumber("8");
                return;
            }
            if (e.code === KEYS.KEY_NINE || e.code === KEYS.NUM_NINE) {
                typingNumber("9");
                return;
            }
            if (e.code === KEYS.KEY_ZERO || e.code === KEYS.NUM_ZERO) {
                typingNumber("0");
                return;
            }
            if (e.code === KEYS.KEY_DECIMAL || e.code === KEYS.NUM_DECIMAL) {
                handleDecimal();
                return;
            }
            if (e.code === KEYS.KEY_DIVIDE || e.code === KEYS.NUM_DIVIDE) {
                calculatorOperation(OPERATORS.DIVIDE);
                return;
            }
            if (
                (e.shiftKey && e.code === KEYS.KEY_EIGHT) ||
                e.code === KEYS.NUM_MULTIPLY
            ) {
                calculatorOperation(OPERATORS.MULTIPLY);
                return;
            }
            if (e.code === KEYS.KEY_MINUS || e.code === KEYS.NUM_MINUS) {
                calculatorOperation(OPERATORS.SUBTRACT);
                return;
            }
            if (
                (e.shiftKey && e.code === KEYS.KEY_EQUAL) ||
                e.code === KEYS.NUM_ADD
            ) {
                calculatorOperation(OPERATORS.ADD);
                return;
            }
            //resetting input
            if (e.code === KEYS.KEY_BACKSPACE) {
                calcDelete();
                return;
            }
            //resetting calculator
            if (e.code === KEYS.KEY_DELETE) {
                resetCalc();
                return;
            }

            if (e.code === KEYS.KEY_ENTER || e.code === KEYS.NUM_ENTER) {
                handleFinalCalculation();
                return;
            }
        }

        window.addEventListener("keydown", handleCalcKeyDown);

        return () => window.removeEventListener("keydown", handleCalcKeyDown);
    }, [
        typingNumber,
        calculatorOperation,
        handleDecimal,
        calcDelete,
        handleFinalCalculation,
    ]);

    const paragraphString =
        intermediateValue &&
        displayedValue &&
        operator &&
        inputStatus === TYPING_STATUS_ENUM.F &&
        displayed
            ? `${displayed?.val1} ${operator} ${displayed?.val2} =`
            : intermediateValue && operator
            ? `${intermediateValue} ${operator}`
            : intermediateValue && !operator
            ? `${intermediateValue} =`
            : "";
    return (
        <main>
            <DisplayElements
                paragraphString={paragraphString}
                displayedValue={displayedValue}
            />
            <CalculatorButtons
                typingNumber={typingNumber}
                calcDelete={calcDelete}
                calculatorOperation={calculatorOperation}
                handleDecimal={handleDecimal}
                handleFinalCalculation={handleFinalCalculation}
                resetCalc={resetCalc}
            />
        </main>
    );
}

function DisplayElements({ paragraphString, displayedValue }) {
    return (
        <section className="displayElements">
            <h2 className="visually-hidden">Calculator Display</h2>
            <p className="visually-hidden">
                Perform a calculation by selecting numbers and your desired
                operation. Operations are limited to addition, multiplication,
                subtraction and division.
            </p>
            <div
                aria-live="polite"
                className="displayElement displayElement__formula"
            >
                <p>{paragraphString}</p>
            </div>
            <div
                aria-live="polite"
                className="displayElement displayElement__calculation"
            >
                <p id={"display"}>{displayedValue}</p>
            </div>
        </section>
    );
}

function CalculatorButtons({
    typingNumber,
    calcDelete,
    calculatorOperation,
    handleDecimal,
    resetCalc,
    handleFinalCalculation,
}) {
    return (
        <section className="calculatorControls">
            <h2 className="visually-hidden">Calculator Buttons</h2>
            <CalculatorButton
                id={"seven"}
                eventhandler={typingNumber}
                args={["7"]}
                aria-label={"7"}
                otherClasses={["btn-calc-primary font-large"]}
            >
                7
            </CalculatorButton>

            <CalculatorButton
                id={"eight"}
                eventhandler={typingNumber}
                args={["8"]}
                otherClasses={["btn-calc-primary font-large"]}
            >
                8
            </CalculatorButton>

            <CalculatorButton
                id={"nine"}
                eventhandler={typingNumber}
                args={["9"]}
                otherClasses={["btn-calc-primary font-large"]}
            >
                9
            </CalculatorButton>

            <CalculatorButton
                id={"delete"}
                eventhandler={calcDelete}
                otherClasses={["btn-calc-alt font-small"]}
            >
                <span aria-hidden="true">Del</span>
                <span className="visually-hidden">Delete</span>
            </CalculatorButton>
            <CalculatorButton
                id={"four"}
                args={["4"]}
                eventhandler={typingNumber}
                otherClasses={["btn-calc-primary font-large"]}
            >
                4
            </CalculatorButton>

            <CalculatorButton
                id={"five"}
                args={["5"]}
                eventhandler={typingNumber}
                otherClasses={["btn-calc-primary font-large"]}
            >
                5
            </CalculatorButton>

            <CalculatorButton
                id={"six"}
                args={["6"]}
                eventhandler={typingNumber}
                otherClasses={["btn-calc-primary font-large"]}
            >
                6
            </CalculatorButton>
            <CalculatorButton
                id={"add"}
                args={[OPERATORS.ADD]}
                eventhandler={calculatorOperation}
                otherClasses={["btn-calc-primary font-large"]}
            >
                <span aria-hidden="true">+</span>
                <span className="visually-hidden">Add</span>
            </CalculatorButton>
            <CalculatorButton
                id={"one"}
                eventhandler={typingNumber}
                args={["1"]}
                otherClasses={["btn-calc-primary font-large"]}
            >
                1
            </CalculatorButton>

            <CalculatorButton
                id={"two"}
                eventhandler={typingNumber}
                args={["2"]}
                otherClasses={["btn-calc-primary font-large"]}
            >
                2
            </CalculatorButton>

            <CalculatorButton
                id={"three"}
                eventhandler={typingNumber}
                args={["3"]}
                otherClasses={["btn-calc-primary font-large"]}
            >
                3
            </CalculatorButton>

            <CalculatorButton
                id={"subtract"}
                eventhandler={calculatorOperation}
                args={[OPERATORS.SUBTRACT]}
                otherClasses={["btn-calc-primary font-large"]}
            >
                <span aria-hidden="true">-</span>
                <span className="visually-hidden">Subtract</span>
            </CalculatorButton>

            <CalculatorButton
                id={"decimal"}
                eventhandler={handleDecimal}
                otherClasses={["btn-calc-primary font-large"]}
            >
                <span aria-hidden="true">.</span>
                <span className="visually-hidden">Decimal</span>
            </CalculatorButton>

            <CalculatorButton
                id={"zero"}
                eventhandler={typingNumber}
                args={["0"]}
                otherClasses={["btn-calc-primary font-large"]}
            >
                0
            </CalculatorButton>

            <CalculatorButton
                id={"divide"}
                args={[OPERATORS.DIVIDE]}
                eventhandler={calculatorOperation}
                otherClasses={["btn-calc-primary font-large"]}
            >
                <span aria-hidden="true">/</span>
                <span className="visually-hidden">Divide</span>
            </CalculatorButton>
            <CalculatorButton
                id={"multiply"}
                args={[OPERATORS.MULTIPLY]}
                eventhandler={calculatorOperation}
                otherClasses={["btn-calc-primary font-large"]}
                props={{ "aria-label": "multiply" }}
            >
                <span aria-hidden="true">X</span>{" "}
                <span className="visually-hidden">Multiply</span>
            </CalculatorButton>
            <CalculatorButton
                id={"clear"}
                eventhandler={resetCalc}
                otherClasses={["btn-2-col btn-calc-alt font-small"]}
            >
                reset
            </CalculatorButton>

            <CalculatorButton
                id={"equals"}
                eventhandler={handleFinalCalculation}
                otherClasses={["btn-2-col btn-calc-accent font-small"]}
            >
                =
            </CalculatorButton>
        </section>
    );
}

function CalculatorButton({
    children,
    id,
    eventhandler,
    args,
    props,
    otherClasses,
}) {
    let classes = otherClasses ? [...otherClasses] : [];
    const { currentTheme } = useContext(ThemeContext);

    return (
        <button
            id={id}
            className={`btn ${currentTheme} ${
                classes.length > 0 ? classes.join(" ") : ""
            }`}
            onClick={() => {
                if (args) {
                    eventhandler(...args);
                } else {
                    eventhandler();
                }
            }}
            {...props}
        >
            {children}
        </button>
    );
}

export default App;
