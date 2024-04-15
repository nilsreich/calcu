"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  MathfieldElement,
  convertAsciiMathToLatex,
  convertLatexToAsciiMath,
} from "mathlive";

import { evaluate } from "mathjs";

console.log(convertAsciiMathToLatex("x^2 + y^2 = 1"));

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
    }
  }
}

export default function Home() {
  const [Input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (mf.current) {
      (mf.current as MathfieldElement).mathVirtualKeyboardPolicy = "manual";
      (mf.current as MathfieldElement).menuItems = [];
    }
  }, []);

  const handleButtonClick = (value: string) => {
    (mf.current as unknown as MathfieldElement).executeCommand([
      "insert",
      value,
      { focus: true, selectionMode: "placeholder"},
    ]);
  };

  const mf = useRef<MathfieldElement | null>(null);

  const handleResult = () => {
    if (mf.current) {
      setResult(
        convertAsciiMathToLatex(
          evaluate(
            convertLatexToAsciiMath(
              (mf.current as MathfieldElement).getValue() || ""
            )
          ).toString()
        )
      );
    }
  };

  const handleReset = () => {
    setInput(() => "");
    setResult(() => "");
    mf.current?.executeCommand(["deleteAll"]);
  };
  return (
    <main className="flex flex-col h-svh p-4">
      <div className="grow  border">
        <div>{""}</div>
        <div className="text-4xl p-2 overflow-scroll">
          <math-field
            onContextMenu={(event: React.MouseEvent) => event.preventDefault()}
            style={{ all: "unset", width: "100%", height: "100%" }}
            ref={mf}
            onChange={(event: React.FormEvent<MathfieldElement>) =>
              setInput(event.currentTarget.value)
            }
          >
            {Input}
          </math-field>
        </div>
        <div className="text-2xl p-2 text-right flex justify-end w-full">
          <math-field read-only style={{ all: "unset" }}>
            {result}
          </math-field>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-6 gap-2 mt-4">
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
            onClick={() => {
              if (mf.current) {
                mf.current.executeCommand(["extendToPreviousWord"]);
                (mf.current as unknown as MathfieldElement).executeCommand([
                  "insert",
                  "\\frac {#0} {#1}",
                  { insertionMode: "replaceSelection", selectionMode: "placeholder" },
                ]);
              }
            }}
          >
            shift
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            alpha
          </Button>
          <div className="col-span-2 row-span-3 self-center grid grid-cols-3 grid-rows-3">
            <Button
              size={"sm"}
              variant={"secondary"}
              className="col-start-2"
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["moveUp"]);
                  mf.current.focus();
                }
              }}
            >
              <ArrowUpIcon />
            </Button>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="row-start-2"
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["moveToPreviousChar"]);
                  mf.current.focus();
                }
              }}
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              size={"sm"}
              variant={"secondary"}
              className=" row-start-2 col-start-3"
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["moveToNextChar"]);
                  mf.current.focus();
                }
              }}
            >
              <ArrowRightIcon />
            </Button>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="row-start-3 col-start-2"
              onClick={() => {
                if (mf.current) {
                  mf.current.executeCommand(["moveDown"]);
                  mf.current.focus();
                }
              }}
            >
              <ArrowDownIcon />
            </Button>
          </div>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            MENU
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            on
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            Optn
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            CALC
          </Button>

          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            int
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            x
          </Button>

          <Button size={"sm"} variant={"outline"}>
            frac
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            sqrt
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            x^-2
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => handleButtonClick("^")}
          >
            x^
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            log
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            ln
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => handleButtonClick("-")}
          >
            (-)
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            .,.
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            x^-1
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            sin
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            cos
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            tan
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            STO
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="uppercase font-semibold"
          >
            ENG
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => handleButtonClick("(")}
          >
            (
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => handleButtonClick(")")}
          >
            )
          </Button>
        </div>
        <div className="grid grid-cols-5 gap-4 ">
          <div className="grid grid-cols-3 mt-4 gap-4 col-span-3">
            {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
              <Button
                key={num}
                size={"sm"}
                className="text-xl font-bold"
                onClick={() => handleButtonClick(`${num}`)}
              >
                {num}
              </Button>
            ))}
            <Button size={"sm"} className="text-xl font-bold">
              x10x
            </Button>
            <Button size={"sm"} className="text-xl font-bold">
              Ans
            </Button>
          </div>
          <div className="grid grid-cols-2 mt-4 gap-4 col-span-2">
            <Button
              className="text-xl font-bold bg-blue-600 text-foreground"
              size={"sm"}
              onClick={() => mf?.current?.executeCommand(["deleteBackward"])}
            >
              DEL
            </Button>
            <Button
              className="text-xl font-bold bg-blue-600 text-foreground"
              size={"sm"}
              onClick={handleReset}
            >
              AC
            </Button>
            <Button
              className="text-xl font-bold"
              size={"sm"}
              onClick={() => handleButtonClick("+")}
            >
              +
            </Button>
            <Button
              className="text-xl font-bold"
              size={"sm"}
              onClick={() => handleButtonClick("-")}
            >
              -
            </Button>
            <Button
              className="text-xl font-bold"
              size={"sm"}
              onClick={() => handleButtonClick("\\cdot")}
            >
              x
            </Button>
            <Button
              className="text-xl font-bold"
              size={"sm"}
              onClick={() => handleButtonClick("\\frac {#0} {#1}")}
            >
              ÷
            </Button>
            <Button
              className="text-xl font-bold"
              size={"sm"}
              onClick={() =>
                mf?.current?.executeCommand(["moveToPreviousChar"])
              }
            >
              ,
            </Button>

            <Button
              size={"sm"}
              className="uppercase font-semibold"
              onClick={handleResult}
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
